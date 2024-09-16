import Empleado from "../Models/empleado";
import FormaPago from "../Models/formapago";
import RegistroDeBarberia, { RegistroDeBarberiaExtendedAttributes } from "../Models/registrodebarberia";
import Servicio from "../Models/Servicio";

export const createRegistroDeBarberia = async (registroDeBarberiaObj: RegistroDeBarberia): Promise<RegistroDeBarberia> => {

  registroDeBarberiaObj.CreateAt = new Date();
  registroDeBarberiaObj.UpdateAt = new Date();
  registroDeBarberiaObj.UpdateBy = registroDeBarberiaObj.CreateBy;
  const registroDeBarberia = await RegistroDeBarberia.create(registroDeBarberiaObj);
  return registroDeBarberia;
};

export const getAllRegistroDeBarberia = async (): Promise<RegistroDeBarberia[]> => {
  const registroDeBarberias = await RegistroDeBarberia.findAll();
  return registroDeBarberias;
};

export const getAllRegistroDeBarberiaExtended = async (page: number = 1, pageSize: number = 10): Promise<RegistroDeBarberiaExtendedAttributes[]> => {
  const registrosExtendidos: RegistroDeBarberiaExtendedAttributes[] = [];

  try {
    const registros = await RegistroDeBarberia.findAll({
      include: [
        {
          model: Empleado,
          as: 'Empleado',
          attributes: ['Nombre', 'Apellido'], // selecciona las columnas que necesitas
        },
        {
          model: Servicio,
          as: 'Servicio',
          attributes: ['CodServicio', 'DescServicio'],
        },
        {
          model: FormaPago,
          as: 'FormaPago',
          attributes: ['Codigo', 'Descripcion'],
        }
      ],
      raw: true, // devuelve los datos en formato de objeto plano
      limit: pageSize, // cantidad de registros por página
      offset: (page - 1) * pageSize // salto de registros
    });

    // Procesar los registros extendidos
    registrosExtendidos.push(...registros.map((registro: any) => ({
      Id: registro.Id,
      IdEmpleado: registro.IdEmpleado,
      NombreApellidoEmpleado: `${String(registro['Empleado.Nombre'])} - ${String(registro['Empleado.Apellido'])}`,
      IdServicio: registro.IdServicio,
      CodServicio: String(registro['Servicio.CodServicio']),
      DescServicio: String(registro['Servicio.DescServicio']),
      IdFormaPago: registro.IdFormaPago,
      CodigoFormaPago: String(registro['FormaPago.Codigo']),
      DescripcionFormaPago: String(registro['FormaPago.Descripcion']),
      Fecha: registro.Fecha,
      Duracion: registro.Duracion,
      Comentario: registro.Comentario,
      PrecioNeto: registro.PrecioNeto,
      CreateAt: registro.CreateAt,
      CreateBy: registro.CreateBy,
      UpdateAt: registro.UpdateAt,
      UpdateBy: registro.UpdateBy
    })));

  } catch (error) {
    console.error('Error fetching records:', error);
    throw error;
  }

  return registrosExtendidos;
};

// Método para contar todos los registros sin paginación
export const countRegistroDeBarberia = async (): Promise<number> => {
  try {
    const count = await RegistroDeBarberia.count(); // O el método adecuado según tu modelo
    return count;
  } catch (error) {
    console.error('Error counting registros:', error);
    throw error;
  }
};

export const getRegistroDeBarberiaById = async (id: number): Promise<RegistroDeBarberia | null> => {
  const registroDeBarberia = await RegistroDeBarberia.findByPk(id);
  return registroDeBarberia;
};

export const updateRegistroDeBarberia = async (id: number, newregistroDeBarberia: RegistroDeBarberia): Promise<RegistroDeBarberia | null> => {
  const registroDeBarberia = await RegistroDeBarberia.findByPk(id);
  if (registroDeBarberia !== null) {

    // evito que actualicen los 2 campos y actualizo el campo updateAt
    const { CreateAt, CreateBy, ...fieldsToUpdate } = newregistroDeBarberia;
    fieldsToUpdate.UpdateAt = new Date();

    await registroDeBarberia.update(fieldsToUpdate);
    return registroDeBarberia;
  }
  return null;
};


export const deleteRegistroDeBarberia = async (id: number): Promise<boolean> => {
  const registroDeBarberia = await RegistroDeBarberia.findByPk(id);
  if (registroDeBarberia !== null) {
    await registroDeBarberia.destroy();
    return true;
  }
  return false;
};
