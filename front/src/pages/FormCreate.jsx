import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Couldinary from "../util/Couldinary";
import { createNewComic } from "../api/post.api";

function FormCreate() {
  const [thumbnailUrl, setThumbnailUrl] = useState("");

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
          values.thumbnail = thumbnailUrl;
          //? console.log("Objeto que se está enviando:", values); // Agregado para ver el objeto en la consola
          try {
            await createNewComic(values);
            resetForm();
            setThumbnailUrl("");
          } catch (error) {
            console.error("Error al enviar el formulario:", error);
          }
        }}
      >
        {({ handleChange, handleSubmit }) => (
          <Form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto my-8 p-8 bg-white shadow-md rounded"
          >
            <label htmlFor="title" className="block mb-2 text-sm text-gray-600">
              Title:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="title"
              placeholder="Write Title"
              onChange={handleChange}
              maxLength="30"
              required
            />

            <label
              htmlFor="author"
              className="block mb-2 text-sm text-gray-600"
            >
              Author:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="author"
              placeholder="Write Author"
              onChange={handleChange}
              pattern="[A-Za-z ]+"
              title="Please enter only letters"
              maxLength="50"
              required
            />

            <label
              htmlFor="description"
              className="block mb-2 text-sm text-gray-600"
            >
              Description:
            </label>
            <Field
              as="textarea"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="description"
              placeholder="Write Description"
              rows="3"
              maxLength="100"
              required
            />

            <label
              htmlFor="publisher"
              className="block mb-2 text-sm text-gray-600"
            >
              Publisher:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="publisher"
              placeholder="Write Publisher"
              onChange={handleChange}
              title="Please enter only letters"
              maxLength="20"
              required
            />

            <label
              htmlFor="category"
              className="block mb-2 text-sm text-gray-600"
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
              required
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              <option value="Superhéroes">Superhéroes</option>
              <option value="Misterio">Misterio</option>
              <option value="Fantasía">Fantasía</option>
              <option value="Acción">Acción</option>
            </Field>

            <label htmlFor="price" className="block mb-2 text-sm text-gray-600">
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
              title="Please enter a non-negative number"
              required
            />

            <label
              htmlFor="thumbnail"
              className="block mb-2 text-sm text-gray-600"
            >
              Thumbnail:
            </label>
            <Couldinary
              onImageUpload={(imageUrl) => setThumbnailUrl(imageUrl)}
            />

            <label htmlFor="pdf" className="block mb-2 text-sm text-gray-600">
              Pdf:
            </label>
            <Field
              as="input"
              className="w-full px-4 py-2 mb-4 border rounded-md"
              name="pdf"
              placeholder="URL pdf"
              onChange={handleChange}
              required
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

export default FormCreate;
