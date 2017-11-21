//
//  ProductTableViewController.swift
//  GameStoreiOS
//
//  Created by Johnny on 07/10/17.
//  Copyright © 2017 JoJoStudio. All rights reserved.
//

import UIKit
import os.log

class ProductTableViewController: UITableViewController {
    var products = [Product]()
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Display an Edit button in the navigation bar for this view controller.
        navigationItem.leftBarButtonItem = editButtonItem
        
        // Load any saved products, otherwise load sample data.
        if let savedProducts = loadProducts() {
            if (savedProducts.count == 0) {
                loadSampleProducts()
            } else {
                products += savedProducts
            }
        }
        else {
            // Load the sample data.
            loadSampleProducts()
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source
    override func numberOfSections(in tableView: UITableView) -> Int {
        return 1
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return products.count
    }

    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {

        // Table view cells are reused and should be dequeued using a cell identifier.
        let cellIdentifier = "ProductTableViewCell"
        
        guard let cell = tableView.dequeueReusableCell(withIdentifier: cellIdentifier, for: indexPath) as? ProductTableViewCell  else {
            fatalError("The dequeued cell is not an instance of ProductTableViewCell.")
        }
        
        // Fetches the appropriate product for the data source layout.
        let product = products[indexPath.row]
        
        cell.nameLabel.text = product.name
        cell.priceLabel.text = "$" + String(describing: product.price)
        cell.photoImageView.image = product.photo
        
        return cell
    }

    // Override to support conditional editing of the table view.
    override func tableView(_ tableView: UITableView, canEditRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }

    // Override to support editing the table view.
    override func tableView(_ tableView: UITableView, commit editingStyle: UITableViewCellEditingStyle, forRowAt indexPath: IndexPath) {
        if editingStyle == .delete {
            // Delete the row from the data source
            products.remove(at: indexPath.row)
            saveProducts()
            tableView.deleteRows(at: [indexPath], with: .fade)
        } else if editingStyle == .insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }

    /*
    // Override to support rearranging the table view.
    override func tableView(_ tableView: UITableView, moveRowAt fromIndexPath: IndexPath, to: IndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(_ tableView: UITableView, canMoveRowAt indexPath: IndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */

    @IBAction func unwindToProductList(sender: UIStoryboardSegue) {
        if let sourceViewController = sender.source as? ProductDetailsViewController, let product = sourceViewController.product {
            
            if let selectedIndexPath = tableView.indexPathForSelectedRow {
                // Update an existing product.
                products[selectedIndexPath.row] = product
                tableView.reloadRows(at: [selectedIndexPath], with: .none)
            }
            else {
                // Add a new product.
                let newIndexPath = IndexPath(row: products.count, section: 0)
                
                products.append(product)
                tableView.insertRows(at: [newIndexPath], with: .automatic)
            }
            
            // Save the products.
            saveProducts()
        }
    }
    
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        super.prepare(for: segue, sender: sender)
        
        switch(segue.identifier ?? "") {
            
        case "AddItem":
            os_log("Adding a new product.", log: OSLog.default, type: .debug)
            
        case "ShowDetail":
            guard let productDetailViewController = segue.destination as? ProductDetailsViewController else {
                fatalError("Unexpected destination: \(segue.destination)")
            }
            
            guard let selectedProductCell = sender as? ProductTableViewCell else {
                fatalError("Unexpected sender: \(String(describing: sender))")
            }
            
            guard let indexPath = tableView.indexPath(for: selectedProductCell) else {
                fatalError("The selected cell is not being displayed by the table")
            }
            
            let selectedProduct = products[indexPath.row]
            productDetailViewController.product = selectedProduct
            
        default:
            fatalError("Unexpected Segue Identifier; \(String(describing: segue.identifier))")
        }
    }
    
    private func saveProducts() {
        let isSuccessfulSave = NSKeyedArchiver.archiveRootObject(products, toFile: Product.ArchiveURL.path)
        if isSuccessfulSave {
            os_log("Product successfully saved.", log: OSLog.default, type: .debug)
        } else {
            os_log("Failed to save products...", log: OSLog.default, type: .error)
        }
    }
    
    private func loadProducts() -> [Product]?  {
        return NSKeyedUnarchiver.unarchiveObject(withFile: Product.ArchiveURL.path) as? [Product]
    }
    
    private func loadSampleProducts() {
        
        let photo1 = UIImage(named: "xbox360")
        let photo2 = UIImage(named: "wii")
        let photo3 = UIImage(named: "controller")
        
        guard let product1 = Product(name: "Xbox 360", photo: photo1, price: 299.00) else {
            fatalError("Unable to instantiate product1")
        }
        
        guard let product2 = Product(name: "Wii", photo: photo2, price: 269.00) else {
            fatalError("Unable to instantiate product2")
        }
        
        guard let product3 = Product(name: "Wireless Controller", photo: photo3, price: 19.99) else {
            fatalError("Unable to instantiate product3")
        }
        
        products += [product1, product2, product3]
    }
}
