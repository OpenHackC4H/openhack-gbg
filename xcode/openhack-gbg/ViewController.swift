//
//  ViewController.swift
//  openhack-gbg
//
//  Created by Shotgun Sorters on 2017-10-07.
//
//

import UIKit
import Foundation
import AVFoundation

class ViewController: UIViewController {
    
    struct Slide{
        let id: Int
        let image: URL
        let sound: URL
    }

    var main = UIView()
    var first = true
    var player: AVAudioPlayer?
    var slides = NSArray()
    var database = [Slide]()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if(first)
        {
            // Change the URL here.
            fetchJSON(url:URL(string:"http://172.4.163.208:8080/db.json")!)
            main = self.view
            first = false
        }
        
        let swipeLeft = UISwipeGestureRecognizer(target: self, action: #selector(handleGesture))
        swipeLeft.direction = .left
        self.view.addGestureRecognizer(swipeLeft)
        
        let swipeRight = UISwipeGestureRecognizer(target: self, action: #selector(handleGesture))
        swipeRight.direction = .right
        self.view.addGestureRecognizer(swipeRight)
    }
    
    @objc func handleGesture(gesture: UISwipeGestureRecognizer) -> Void {        
        if gesture.direction == UISwipeGestureRecognizerDirection.right {
            hide(view: main.subviews[0] as! UIImageView)
            main.sendSubview(toBack: main.subviews[main.subviews.endIndex - 1])
            show(view: main.subviews[0] as! UIImageView, direction: 0)
        }
        else if gesture.direction == UISwipeGestureRecognizerDirection.left {
            hide(view: main.subviews[0] as! UIImageView)
            main.bringSubview(toFront: main.subviews[0])
            show(view: main.subviews[0] as! UIImageView, direction: 1)
        }
    }
    
    func fetchJSON(url: URL)
    {
        URLSession.shared.dataTask(with: (url as URL?)!, completionHandler: {(data, response, error) -> Void in
            if let object = try? JSONSerialization.jsonObject(with: data!, options: .allowFragments) as? NSDictionary {
                self.slides = (object!.value(forKey: "slides") as! NSArray)
            }
            
            OperationQueue.main.addOperation({
                self.generateSlides()
            })
        }).resume()
    }
    
    func generateSlides()
    {
        var index = 0
        
        for slide in slides
        {
            if let dictionary = slide as? NSDictionary
            {
                if let image = dictionary.value(forKey: "image"), let sound = dictionary.value(forKey: "sound") {
                    do {
                        // TODO: Support for more formats.
                        let jpg = try! FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false).appendingPathComponent("\(index).jpg")
                        
                        let mp3 = try! FileManager.default.url(for: .documentDirectory, in: .userDomainMask, appropriateFor: nil, create: false).appendingPathComponent("\(index).mp3")
                        
                        let data_image = try Data(contentsOf: URL(string: image as! String)!)
                        let data_sound = try Data(contentsOf: URL(string: sound as! String)!)
                        
                        try data_image.write(to: jpg)
                        try data_sound.write(to: mp3)
                        
                        let entry = Slide(id: index, image: jpg, sound: mp3)
                        self.database.append(entry)
                        
                        index += 1
                    } catch _ {
                        print(Error.self)
                    }
                }
            }
        }

        generateViews()
    }
    
    func show(view: UIImageView, direction: Int)
    {
        if(direction == 0)
        {
            view.frame.origin.x = -60
        }else{
            view.frame.origin.x = 60
        }
        
        view.alpha = 0
        
        UIImageView.animate(withDuration: 0.15) {
            view.frame.origin.x = 0
            view.alpha = 1
            
            for entry in self.database
            {
                if(view.tag == entry.id)
                {
                    do {
                        try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback)
                        try AVAudioSession.sharedInstance().setActive(true)
                        
                        self.player = try AVAudioPlayer(contentsOf: entry.sound)
                        guard let player = self.player else { return }
                        
                        player.play()
                    } catch let error {
                        print(error.localizedDescription)
                    }
                }
            }
        }
    }
    
    func hide(view: UIImageView)
    {
        view.alpha = 1
        
        UIImageView.animate(withDuration: 0.15) {
            view.alpha = 0
            self.player?.pause()
        }
    }
    
    func generateViews()
    {
        for entry in database
        {
            do
            {
                let image = try UIImageView(image: UIImage(data: Data(contentsOf: entry.image)))
                
                image.frame = self.view.frame
                image.backgroundColor = UIColor.black
                image.contentMode = UIViewContentMode.scaleAspectFit
                image.tag = entry.id
                
                hide(view: image)
                
                self.main.addSubview(image)
            } catch _ {
                print(Error.self)
            }
        }
        
        self.main.bringSubview(toFront: self.main.subviews[main.subviews.endIndex - 1])
        show(view: main.subviews[0] as! UIImageView, direction: 1)
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
}
