package Johnny.JPATutorial.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import Johnny.JPATutorial.Entity.Employee;

public class CreateEmployee {
    public static void main(String[] args) {

        EntityManagerFactory emfactory = Persistence.createEntityManagerFactory("JPATutorial");

        EntityManager entitymanager = emfactory.createEntityManager();
        entitymanager.getTransaction().begin();

        Employee employee = new Employee();
        employee.setEid(1001);
        employee.setEname("Johnny");
        employee.setSalary(40000);
        employee.setDeg("Technical Manager");

        entitymanager.persist(employee);
        entitymanager.getTransaction().commit();

        entitymanager.close();
        emfactory.close();
    }
}
