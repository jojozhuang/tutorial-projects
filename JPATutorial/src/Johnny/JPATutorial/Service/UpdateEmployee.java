package Johnny.JPATutorial.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import Johnny.JPATutorial.Entity.Employee;

public class UpdateEmployee {
    public static void main(String[] args) {
        EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("JPATutorial");

        EntityManager entitymanager = emfactory.createEntityManager();
        entitymanager.getTransaction().begin();
        Employee employee = entitymanager.find(Employee.class, 1001);

        // before update
        System.out.println(employee);
        employee.setSalary(86000);
        entitymanager.getTransaction().commit();

        // after update
        System.out.println(employee);
        entitymanager.close();
        emfactory.close();
    }
}
