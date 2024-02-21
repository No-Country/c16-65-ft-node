import { Formik, Form, Field } from "formik";
import { createNewComic } from "../api/post.api";

function FormCreate() {
  return (
    <div>
      <Formik
        initialValues={{
          title: "",
          author: "",
          description: "",
          publisher: "",
          category: "",
          price: "",
          thumbnail: "",
          pdf: "",
        }}

    


        onSubmit={async (values, { resetForm }) => {
          try {
            await createNewComic(values);
            resetForm(); 
            
            // Resetear el formulario después de enviarlo con éxito
          } catch (error) {
            console.error(error);
          }
          console.log(values);
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto my-8 p-8 bg-white shadow-md rounded"
          >
            <label className="block mb-2 text-sm text-gray-600" htmlFor="title">
              Title:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="title"
              placeholder="Write Title"
              onChange={handleChange}
            />

            <label
              className="block mb-2 text-sm text-gray-600"
              htmlFor="author"
            >
              Author:
            </label>

            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="author"
              placeholder="Write Author"
              onChange={handleChange}
              
            />

            <label
              className="block mb-2 text-sm text-gray-600"
              htmlFor="description"
            >
              Description:
            </label>
            <Field
              as="textarea"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="description"
              placeholder="Write Description"
              rows="3"
            />

            <label
              className="block mb-2 text-sm text-gray-600"
              htmlFor="publisher"
            >
              Publisher:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="publisher"
              placeholder="Write Publisher"
              onChange={handleChange}
            />

            <label
              className="block mb-2 text-sm text-gray-600"
              htmlFor="category"
            >
              Category:
            </label>
            <Field
              as="select"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              id="category"
              name="category"
              placeholder="Categoria"
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              <option value="Superhéroes">Superhéroes</option>
              <option value="Misterio">Misterio</option>
              <option value="Fantasía">Fantasía</option>
              <option value="Acción">Acción</option>
            </Field>

            <label className="block mb-2 text-sm text-gray-600" htmlFor="price">
              Price:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="price"
              min="0" 
              type="number"
              placeholder="Write Price"
              onChange={handleChange}
            />

            <label
              className="block mb-2 text-sm text-gray-600"
              htmlFor="thumbnail"
            >
              Thumbnail:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              type="text"
              name="thumbnail"
              placeholder="write URL img"
              onChange={handleChange}
            />

            <label className="block mb-2 text-sm text-gray-600" htmlFor="pdf">
              Pdf:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="pdf"
              placeholder="URL pdf"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

//? Formik
export default FormCreate;
