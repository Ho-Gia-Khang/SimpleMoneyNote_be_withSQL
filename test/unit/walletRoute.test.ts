import app from "../../src/index";
import request from "supertest";

describe("The CRUD functionalities of wallet endpoints", function () {
    let accessToken: string;
    let refreshToken: string;
    let walletId: string;

    beforeAll(async function () {
        // simulate the login process
        const userResponse = await request(app).post("/user/login").send({
            email: "Oppenheimer@gmail.com",
            password: "Oppenheimer123",
        });

        refreshToken = userResponse.body.refreshToken;
        accessToken = userResponse.body.accessToken;
    });

    it("should create a new wallet", async function () {
        const response = await request(app)
            .post("/wallet/create")
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            })
            .send({
                name: "test wallet",
                balance: 2000000,
            });

        walletId = response.body.id;
        expect(response.status).toEqual(201);
        expect(response.body).toHaveProperty("id");
    });

    it("should get all wallets", async function () {
        const response = await request(app)
            .get("/wallet/getAll")
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should get a wallet by id", async function () {
        const response = await request(app)
            .get(`/wallet/getOne/${walletId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should update a wallet", async function () {
        const response = await request(app)
            .put(`/wallet/update/${walletId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            })
            .send({
                name: "updated wallet",
            });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty("id");
    });

    it("should delete a wallet", async function () {
        const response = await request(app)
            .delete(`/wallet/delete/${walletId}`)
            .set({
                authorization: `Bearer ${accessToken}`,
                x_refresh: refreshToken,
            });

        expect(response.status).toEqual(200);
    });
});
