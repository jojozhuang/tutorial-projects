package johnny.mongodbtutorial.dao;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;

import johnny.mongodbtutorial.converter.ProductConverter;
import johnny.mongodbtutorial.model.Product;

public class ProductDao {
    private DBCollection col;

    public ProductDao(MongoClient mongo) {
        this.col = mongo.getDB("store").getCollection("product");
    }

    public Product create(Product p) {
        DBObject doc = ProductConverter.toDBObject(p);
        this.col.insert(doc);
        ObjectId id = (ObjectId) doc.get("_id");
        p.setId(id.toString());
        return p;
    }

    public void update(Product p) {
        DBObject query = BasicDBObjectBuilder.start()
                .append("_id", new ObjectId(p.getId())).get();
        this.col.update(query, ProductConverter.toDBObject(p));
    }

    public List<Product> getList() {
        List<Product> data = new ArrayList<Product>();
        DBCursor cursor = col.find();
        while (cursor.hasNext()) {
            DBObject doc = cursor.next();
            Product p = ProductConverter.toProduct(doc);
            data.add(p);
        }
        return data;
    }

    public void delete(String id) {
        DBObject query = BasicDBObjectBuilder.start()
                .append("_id", new ObjectId(id)).get();
        this.col.remove(query);
    }

    public Product getProduct(String id) {
        DBObject query = BasicDBObjectBuilder.start()
                .append("_id", new ObjectId(id)).get();
        DBObject data = this.col.findOne(query);
        return ProductConverter.toProduct(data);
    }

    public boolean exists(String id) {
        DBObject query = BasicDBObjectBuilder.start()
                .append("_id", new ObjectId(id)).get();
        DBObject data = this.col.findOne(query);
        return data != null;
    }
}
