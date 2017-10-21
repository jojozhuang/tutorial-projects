/*
   Data fix to set price = price * 2
*/

var ProductDao = Johnny.RhinoDataFix.Dao.ProductDao;

var gDebugText = "";
var Datafix = "Update products by doubling their prices";

dfOnProduct();

function dfOnProduct ()
{
    try {
        logDebug("Data Fix with JS: " + Datafix + ": START");
        var products = ProductDao.getList();
        for (var i=0; i< products.size(); i++) {
            var product = products.get(i);
            logDebug("[fixProduct]: #" + (i + 1) + " out of " + products.size() + ", Before fix: " + product);
            product.setPrice(product.getPrice() * 2);
            logDebug("[fixProduct]: After fix: " + product);
            ProductDao.update(product);
        }
        logDebug("Summary: Fixed " + products.size() + " Products.");
    }
    catch (ex) {
        logDebug("[dfOnProduct] DF Failed ! Exception: " + ex.toString());
    }
    finally {
        logDebug("Data Fix with JS: " + Datafix + ": END");
    }
}

function logDebug(msg) {
    gDebugText += (msg + "\n");
}

show = gDebugText;
