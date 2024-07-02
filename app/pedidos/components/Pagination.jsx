"use client";

import { Button } from "@/components/ui/button";
import { SelectLimit } from "./SelectLimit";
import { useFormik } from "formik";

import * as yup from "yup";

const PaginationPedidos = ({ searchParams = {}, totalCount = 0 }) => {
  const size = parseInt(searchParams["limit"] || 10, 10);

  const totalPages = Math.ceil(totalCount / size);

  const formik = useFormik({
    initialValues: {
      page: parseInt(Math.max(searchParams["page"] || 1, 1), 10),
      limit: parseInt(searchParams.limit ? Number(searchParams["limit"]) : 5),
    },
    validationSchema: yup.object().shape({
      page: yup.number().positive().required(),
      limit: yup.number().positive().required(),
    }),
    onSubmit: async (values) => {
      const query = new URLSearchParams({
        ...searchParams,
        page: values.page,
        limit: values.limit,
      }).toString();

      await new Promise((resolve) => {
        window.location.assign(`/pedidos?${query}`);
      });
    },
  });

  const currentPage = formik.values.page;

  function onPageChange(page = 1) {
    formik.setFieldValue("page", page);
    formik.submitForm();
  }

  function onLimitChange(limit = 5) {
    formik.setFieldValue("limit", limit);
    formik.submitForm();
  }

  const getVisiblePages = (page, total) => {
    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, 4, "...", total];
    }

    if (page >= total - 2) {
      return [1, "...", total - 3, total - 2, total - 1, total];
    }

    return [1, "...", page - 1, page, page + 1, "...", total];
  };

  const pages = getVisiblePages(currentPage, totalPages);

  return (
    <nav aria-label="Page navigation" className="my-4 flex justify-end">
      <SelectLimit
        value={formik.values.limit}
        disabled={formik.isSubmitting}
        onChange={onLimitChange}
      />
      <ul className="ml-4 inline-flex items-center -space-x-px">
        <li>
          <Button
            onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            className={`ml-0 mr-2 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? "cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1 || formik.isSubmitting}
          >
            Anterior
          </Button>
        </li>
        {pages.map((page, index) =>
          page === "..." ? (
            <li key={index}>
              <span className="shrink-0 border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500">
                ...
              </span>
            </li>
          ) : (
            <li key={page}>
              <Button
                onClick={() => onPageChange(page)}
                className={`shrink-0 border px-3 py-2 leading-tight ${
                  page === currentPage
                    ? "border-blue-300 bg-blue-50 text-blue-600 hover:bg-blue-50"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                }`}
                type="outline"
                disabled={formik.isSubmitting}
              >
                {page}
              </Button>
            </li>
          ),
        )}
        <li>
          <Button
            onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            className={`ml-2 rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === totalPages ? "cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages || formik.isSubmitting}
          >
            Próxima
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationPedidos;
