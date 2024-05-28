import app from "../../src/index";
import request from "supertest";

describe("The CRUD functionalities of category endpoints", function () {
    let accessToken: string;
    let refreshToken: string;
    let categoryId: string;

    beforeAll(async function () {
        // simulate the login process
        const userResponse = await request(app).post("/user/login").send({
            email: "Oppenheimer@gmail.com",
            password: "Oppenheimer123",
        });

        refreshToken = userResponse.body.refreshToken;
        accessToken = userResponse.body.accessToken;
    });

    it("should create a new category", async function () {
        const response = await request(app)
            .post("/category/create")
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            })
            .send({
                name: "test category",
                type: "expense",
            });

        categoryId = response.body.id;
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("id");
    });

    it("should get all categories", async function () {
        const response = await request(app)
            .get("/category/getAll")
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should get a category by id", async function () {
        const response = await request(app)
            .get(`/category/getOne/${categoryId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should update a category", async function () {
        const response = await request(app)
            .put(`/category/update/${categoryId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            })
            .send({
                name: "updated category",
            });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should delete a category", async function () {
        const response = await request(app)
            .delete(`/category/delete/${categoryId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
    });
});
