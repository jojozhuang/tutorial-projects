package johnny.mongodbtutorial.converter;

import org.bson.types.ObjectId;

import com.mongodb.BasicDBObjectBuilder;
import com.mongodb.DBObject;

import johnny.mongodbtutorial.model.Product;

public class ProductConverter {

    // convert Product Object to MongoDB DBObject
    // take special note of converting id String to ObjectId
    public static DBObject toDBObject(Product p) {
        BasicDBObjectBuilder builder = BasicDBObjectBuilder.start()
                .append("name", p.getName()).append("price", p.getPrice());
        if (p.getId() != null)
            builder = builder.append("_id", new ObjectId(p.getId()));
        return builder.get();
    }

    // convert DBObject Object to Product
    // take special note of converting ObjectId to String
    public static Product toProduct(DBObject doc) {
        Product p = new Product();
        p.setName((String) doc.get("name"));
        p.setPrice((Double) doc.get("price"));
        ObjectId id = (ObjectId) doc.get("_id");
        p.setId(id.toString());
        return p;
    }

}