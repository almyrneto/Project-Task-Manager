// URL da API
const API_URL = "http://localhost:3000/tables";

// numero de itens por pagina
const ITEMS_PER_PAGE = 5;

//variáveis para acompanhar a página atual e o número total de páginas
let currentPage = 1;
let totalPages;

//função para buscar dados da API e exibi-los na página
function fetchData() {
  //calcular o deslocamento para a página atual
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  //buscar dados da API
  fetch(`${API_URL}?offset=${offset}&limit=${ITEMS_PER_PAGE}`)
    .then((db) => db.json())
    .then((data) => {
      //atualize a variável para o número total de páginas
      totalPages = Math.ceil(data.total_count / ITEMS_PER_PAGE);

      //atualize o htm para o container de dados
      const dataContainer = document.getElementById("table-body");
      dataContainer.innerHTML = data.items
        .map((item) => `<p>${item.name}</p>`)
        .join("");

      //atualize o estado do botão anterior
      const prevBtn = document.getElementById("prev-btn");
      if (currentPage === 1) {
        prevBtn.disabled = true;
      } else {
        prevBtn.disabled = false;
      }

      //atualize o estado do proximo botao
      const nextBtn = document.getElementById("next-btn");
      if (currentPage === totalPages) {
        nextBtn.disabled = true;
      } else {
        nextBtn.disabled = false;
      }
    });
}

//chame a função fetchData para exibir os dados iniciais
fetchData();

//adicionar event listener para os botões anterior e seguinte
const prevBtn = document.getElementById("prev-btn");
prevBtn.addEventListener("click", () => {
  currentPage--;
  fetchData();
});

const nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", () => {
  currentPage++;
  fetchData();
});
