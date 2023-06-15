class UserManager {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    try {
      const users = await this.model.find();
      return users;
    } catch (error) {
      throw new Error(`Error al recuperar usuarios`);
    }
  }

  async addUser(user) {
    try {
      const data = await this.model.create(user);
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al guardar: ${error.message}`);
    }
  }

  async getUserByEmail(email) {
    try {
      const data = await this.model.findOne({ email: email });
      // const response = JSON.parse(JSON.stringify(data));
      return data;
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  async updateUser(id, user) {
    try {
      const data = await this.model.findByIdAndUpdate(id, user, { new: true });
      if (!data) {
        throw new Error(`Error al actualizar: no se encontró el id ${id}`);
      }
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al actualizar: no se encontró el id ${id}`);
    }
  }

  async getUserById(id) {
    try {
      const data = await this.model.findById(id);
      if (!data) {
        throw new Error(`no se encontro el usuario`);
      }
      const response = JSON.parse(JSON.stringify(data));
      return response;
    } catch (error) {
      throw new Error(`Error al obtener usuario: ${error.message}`);
    }
  }

  async deleteUsers(last_connection) {
    try {
      const result = this.model.deleteMany({
        last_connection: last_connection,
      });
      return result;
    } catch (error) {
      throw new Error(`Error al borrar usuarios`);
    }
  }
}

export { UserManager };
