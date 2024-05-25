import app from "../../src/index";
import request from "supertest";

describe("The CRUD functionalities of note endpoints", function () {
    let accessToken: string;
    let refreshToken: string;
    let bookId: string;
    let noteId: string;

    beforeAll(async function () {
        // simulate the login process
        const userResponse = await request(app).post("/user/login").send({
            email: "Oppenheimer@gmail.com",
            password: "Oppenheimer123",
        });

        refreshToken = userResponse.body.refreshToken;
        accessToken = userResponse.body.accessToken;

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

        bookId = bookResponse.body.id;
    });

    it("should create a new note", async function () {
        const response = await request(app)
            .post(`/note/create/${bookId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            })
            .send({
                amount: 2000000,
            });

        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("id");

        noteId = response.body.id;
    });

    it("should get all notes", async function () {
        const response = await request(app)
            .get(`/note/getAll/${bookId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
    });

    it("Should get a note by id", async function () {
        const response = await request(app)
            .get(`/note/getOne/${noteId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should update a note", async function () {
        const response = await request(app)
            .put(`/note/update/${noteId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            })
            .send({
                amount: 3000000,
            });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should delete a note", async function () {
        const response = await request(app)
            .delete(`/note/delete/${noteId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
    });

    afterAll(async function () {
        await request(app)
            .delete(`/book/delete/${bookId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });
    });
});
