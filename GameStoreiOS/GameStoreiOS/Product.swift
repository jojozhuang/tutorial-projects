//
//  Product.swift
//  GameStoreiOS
//
//  Created by Johnny on 07/10/17.
//  Copyright © 2017 JoJoStudio. All rights reserved.
//

import UIKit
import os.log

class Product: NSObject, NSCoding {
    
    //MARK: Properties
    
    var name: String
    var photo: UIImage?
    var price: Double
    
    init?(name: String, photo: UIImage?, price: Double) {
        
        // Initialization should fail if there is no name.
        if name.isEmpty {
            return nil
        }
        
        // Initialize stored properties.
        self.name = name
        self.photo = photo
        self.price = price
    }
    
    struct PropertyKey {
        static let name = "name"
        static let photo = "photo"
        static let price = "price"
    }
    
    func encode(with aCoder: NSCoder) {
        aCoder.encode(name, forKey: PropertyKey.name)
        aCoder.encode(photo, forKey: PropertyKey.photo)
        aCoder.encode(price, forKey: PropertyKey.price)
    }

    required convenience init?(coder aDecoder: NSCoder) {
        // The name is required. If we cannot decode a name string, the initializer should fail.
        guard let name = aDecoder.decodeObject(forKey: PropertyKey.name) as? String else {
            os_log("Unable to decode the name for a Product object.", log: OSLog.default, type: .debug)
            return nil
        }
        
        // Because photo is an optional property of Product, just use conditional cast.
        let photo = aDecoder.decodeObject(forKey: PropertyKey.photo) as? UIImage
        
        guard let price = aDecoder.decodeObject(forKey: PropertyKey.price) as? Double else {
            os_log("Unable to decode the price for a Product object.", log: OSLog.default, type: .debug)
            return nil
        }
        
        // Must call designated initializer.
        self.init(name: name, photo: photo, price: price)
        
    }
    
    //MARK: Archiving Paths
    
    static let DocumentsDirectory = FileManager().urls(for: .documentDirectory, in: .userDomainMask).first!
    static let ArchiveURL = DocumentsDirectory.appendingPathComponent("products")
}
