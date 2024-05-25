import app from "../../src/index";
import request from "supertest";

describe("The CRUD functionalities of book endpoints", function () {
    let accessToken: string;
    let refreshToken: string;
    let bookId: string;

    beforeAll(async function () {
        // simulate the login process
        const userResponse = await request(app).post("/user/login").send({
            email: "Oppenheimer@gmail.com",
            password: "Oppenheimer123",
        });

        refreshToken = userResponse.body.refreshToken;
        accessToken = userResponse.body.accessToken;
    });

    it("should create a new book", async function () {
        // simulate creating a new book
        const bookResponse = await request(app)
            .post(`/book/create`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            })
            .send({
                name: "Test book",
            });

        expect(bookResponse.status).toEqual(201);
        expect(bookResponse.body).toHaveProperty("id");

        bookId = bookResponse.body.id;
    });

    it("should get all books", async function () {
        const response = await request(app)
            .get(`/book/getAll`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        console.log(response.body);
        expect(response.status).toEqual(200);
    });

    it("should get a book by id", async function () {
        const response = await request(app)
            .get(`/book/getOne/${bookId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should update a book", async function () {
        const response = await request(app)
            .put(`/book/update/${bookId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            })
            .send({
                name: "Updated book",
            });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should delete a book", async function () {
        const response = await request(app)
            .delete(`/book/delete/${bookId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
    });
});
