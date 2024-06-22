"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export function PaginationPedidos({ searchParams = {}, totalItems = 0 }) {
  const page = searchParams.page ? Number(searchParams.page) : 1;
  const limit = searchParams.limit ? Number(searchParams.limit) : 3;
  const qtdPages = Number(totalItems) / limit;

  function setPageUrl(value = 1) {
    const _searchParams = {
      ...searchParams,
    };

    _searchParams.page = Number(value);
    _searchParams.limit = Number(limit);

    const querystring = new URLSearchParams(_searchParams).toString();

    return `/pedidos?${querystring}`;
  }

  function getNextPage() {
    let nextPage = page === qtdPages ? qtdPages : page + 1;

    return setPageUrl(nextPage);
  }

  function getPreviousPage() {
    let previousPage = page === 1 ? 1 : page - 1;

    return setPageUrl(previousPage);
  }

  const nextPage = getNextPage();

  const previousPage = getPreviousPage();

  const firstPage = setPageUrl(1);

  const lastPage = setPageUrl(qtdPages);

  return (
    <div className="my-4 flex w-full items-center justify-end">
      <Pagination className="m-0 w-fit">
        <PaginationContent>
          <PaginationItem
            data-first={page === 1}
            className="data-[first=true]:hidden"
          >
            <PaginationPrevious displayName="Anterior" href={previousPage} />
          </PaginationItem>
          <PaginationItem
            data-first={page === 1}
            className="data-[first=false]:hidden"
          >
            Primeira página
          </PaginationItem>
          <PaginationItem
            data-first={page === 1}
            className="data-[first=true]:hidden"
          >
            <PaginationLink href={firstPage}>{1}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              {page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem
            data-last={page === qtdPages}
            className="data-[last=true]:hidden"
          >
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem
            data-last={page === qtdPages}
            className="data-[last=true]:hidden"
          >
            <PaginationLink href={lastPage}>{qtdPages}</PaginationLink>
          </PaginationItem>
          <PaginationItem
            data-last={page === qtdPages}
            className="data-[last=false]:hidden"
          >
            Última página
          </PaginationItem>
          <PaginationItem
            data-last={page === qtdPages}
            className="data-[last=true]:hidden"
          >
            <PaginationNext displayName="Próxima" href={nextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
