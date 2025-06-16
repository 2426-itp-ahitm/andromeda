package at.ac.htlleonding;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.response.Response;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class UserRequestTest {

    @Test
    public void testAddUser() {
        given()
                .contentType("application/json")
                .body("""
            {
              "name": "Harald"
            }
            """)
                .when()
                .post("/api/andromeda/user/addUser")
                .then()
                .statusCode(anyOf(is(200), is(201)))
                .body(notNullValue());  // mindestens irgendeine Antwort, z.B. ID

        // Optional: ID auslesen, falls du sie weiter verwenden willst
    /*
    int id = given()
      .contentType("application/json")
      .body("{\"name\":\"Harald\"}")
      .when()
      .post("/api/andromeda/user/addUser")
      .then()
      .extract()
      .path("id");
    */
    }

/*
    @Test
    public void testUpdateUser() {
        // 1. User anlegen und ID aus Response holen
        int id = given()
                .contentType("application/json")
                .body("""
          {
            "name": "Harald"
          }
          """)
                .when()
                .post("/api/andromeda/user/addUser")
                .then()
                .statusCode(anyOf(is(200), is(201)))
                .extract()
                .path("id");

        // 2. User mit der erhaltenen ID updaten und prüfen, dass der Name stimmt
        given()
                .contentType("application/json")
                .body("""
          {
            "id": %d,
            "name": "Bruno"
          }
          """.formatted(id))
                .when()
                .put("/api/andromeda/user/updateUser")
                .then()
                .statusCode(200)
                .body("id", equalTo(id))
                .body("name", equalTo("Bruno"));
    }

*/

    @Test
    public void testGetUsers() {
        // User anlegen, damit Liste nicht leer ist
        given()
                .contentType("application/json")
                .body("""
                {
                  "name": "TestUser"
                }
                """)
                .when()
                .post("/api/andromeda/user/addUser")
                .then()
                .statusCode(anyOf(is(200), is(201)));

        // Jetzt die User-Liste abrufen und prüfen, dass sie nicht leer ist
        given()
                .when()
                .get("/api/andromeda/user/getUsers")
                .then()
                .statusCode(200)
                .body("$", is(not(empty())));
    }
}
