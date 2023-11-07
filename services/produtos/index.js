const { down } = require("@/hooks/loader");

export const getProdutoSubProdutosFotosPorCdProduto = (cdproduto, nmsubprodutofototipo) =>
  down(`/api/produtos/${cdproduto}/sub-produtos/fotos?${nmsubprodutofototipo ? `nmsubprodutofototipo=${nmsubprodutofototipo}` : ''}`);

export const getProdutoSubProdutosPrecosPorCdProduto = (cdproduto) =>
  down(`/api/produtos/${cdproduto}/sub-produtos/precos`);

export const getProdutoSubProdutosPorCdProduto = (cdproduto) =>
  down(`/api/produtos/${cdproduto}/sub-produtos`);

export const getProdutoSubProdutosPorCdProdutoAndNmSubProdutoTipo = (cdproduto, nmsubprodutotipo) =>
  down(`/api/produtos/${cdproduto}/sub-produtos?nmsubprodutotipo=${nmsubprodutotipo}`);

export const getProdutoPrecoPorCdProduto = (cdproduto) =>
  down(`/api/produtos/${cdproduto}/precos`);

export const getProdutoFotosPorCdProduto = (cdproduto) =>
  down(`/api/produtos/${cdproduto}/fotos`);
