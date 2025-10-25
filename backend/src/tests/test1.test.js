const { mongoose, connectDB } = require("../../database");
const request = require("supertest");
const app = require("../../app");

beforeAll(async () => {
await connectDB();
});

afterAll(async () => {

});

describe("POST /empleados", () => {

  it("POST /api/empleados → debe crear un empleado correctamente", async () => {
    const data = {
      nombre: "Juan Ramirez",
      cargo: "admin01",
      departamento: "Financiero",
      sueldo: 1400
    };

    const res = await request(app)
      .post("/api/empleados")
      .send(data)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("message", "Empleado creado");
    expect(res.body.empleado).toHaveProperty("nombre", data.nombre);
    expect(res.body.empleado).toHaveProperty("cargo", data.cargo);
    expect(res.body.empleado).toHaveProperty("departamento", data.departamento);
    expect(res.body.empleado).toHaveProperty("sueldo", data.sueldo);
  });

 
  it("POST /api/empleados → debe devolver error si faltan campos", async () => {
    const data = { nombre: "Carlos" }; 

    const res = await request(app)
      .post("/api/empleados")
      .send(data)
      .set("Accept", "application/json");

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Error: faltan campos obligatorios");
    expect(res.body.missingFields).toEqual({
      nombre: false,
      cargo: true,
      departamento: true,
      sueldo: true
    });
  });

  it("GET /api/empleados → debe devolver lista de empleados", async () => {
    const res = await request(app).get("/api/empleados");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      const empleado = res.body[0];
      expect(empleado).toHaveProperty("_id");
      expect(empleado).toHaveProperty("nombre");
      expect(empleado).toHaveProperty("cargo");
      expect(empleado).toHaveProperty("departamento");
      expect(empleado).toHaveProperty("sueldo");
    }
  });

});
