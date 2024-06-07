const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

export const controleColumns = [
  [
    {
      title: "Todos",
      items: [
        {
          label: "PG Painted",
          href: `${DOMAIN}/parceiros`,
        },
        {
          label: "Coleção Parceiros PG",
          href: `/produtos?nmproduto=Envie Seu Controle`,
        },
      ],
    },
    {
      title: "PS5 / PC",
      items: [
        {
          label: "Obsidian",
          href: `${DOMAIN}/produtos/?nmproduto=Obsidian`,
        },
        {
          label: "Speakeasy",
          href: `${DOMAIN}/produtos/?nmproduto=Speakeasy`,
        },
      ],
    },
    {
      title: "XBOX / PC",
      items: [
        {
          label: "Grandmaster",
          href: `${DOMAIN}/produtos/?nmproduto=grandmaster`,
        },
      ],
    },
    {
      title: "PS4 / PC",
      items: [
        {
          label: "Goliath",
          href: `${DOMAIN}/produtos/?nmproduto=goliath`,
        },
      ],
    },
  ],
  [
    {
      title: "Instale você mesmo",
      items: [
        {
          label: "Kit Shape + Placa Remap + Paddles PG",
          href: `${DOMAIN}/produtos/?nmproduto=Kit Shape + Placa Remap + Paddles PG`,
        },
        {
          label: "Kit Paddles PG",
          href: `${DOMAIN}/produtos/?nmproduto=Kit Paddles PG`,
        },
        {
          label: "Placa PG Controle Arcade PS5 / PC",
          href: `${DOMAIN}/produtos/?nmproduto=Placa PG Controle Arcade PS5 / PC`,
        },
      ],
    },
    {
      title: "PG Custom Trade-in",
      items: [
        {
          label: "Troque seu PG Antigo por um Novinho",
          href: `${DOMAIN}/produtos/?nmproduto=Troque seu PG Antigo Por um Novinho`,
        },
      ],
    },
  ],
  [
    {
      title: "Acessórios e Peças",
      items: [
        {
          label: "Cases Custom",
          href: `${DOMAIN}/produtos/?nmproduto=Cases Custom`,
        },
        {
          label: "Paddles",
          href: `${DOMAIN}/produtos/?nmproduto=Paddles`,
        },
        {
          label: "Faceplates",
          href: `${DOMAIN}/produtos/?nmproduto=Faceplates`,
        },
        {
          label: "Cartões de presente",
          href: `${DOMAIN}/produtos/?nmproduto=Cartões de presente`,
        },
        {
          label: "Cabos",
          href: `${DOMAIN}/produtos/?nmproduto=Cabos`,
        },
        {
          label: "Trigger PG Click Mouse",
          href: `${DOMAIN}/produtos/?nmproduto=Trigger PG Click Mouse`,
        },
        {
          label: "Placa Remap Paddles",
          href: `${DOMAIN}/produtos/?nmproduto=Placa Remap Paddles`,
        },
      ],
    },
  ],
];

export const consoleColumns = [
  [
    {
      title: "PS5",
      items: [
        {
          label: "Shapes PS5 Painted",
          href: `${DOMAIN}/produtos/?nmproduto=Shapes PS5 Painted`,
        },
      ],
    },
    {
      title: "XBOX",
      items: [
        {
          label: "Shapes XBOX Painted",
          href: `${DOMAIN}/produtos/?nmproduto=Shapes XBOX Painted`,
        },
      ],
    },
    {
      title: "Em estoque ( Todos )",
      items: [
        {
          label: "Shapes à pronta entrega",
          href: `${DOMAIN}/produtos/?nmproduto=Shapes à pronta entrega`,
        },
      ],
    },
  ],
  [
    {
      title: "Quer um shape com seu design?",
      items: [
        {
          label: "Entre em contato via Whatsapp",
          href: `https://wa.me/5521994391557"`,
        },
      ],
    },
  ],
];

export const mouseColumns = [
  [
    {
      title: "Nossos Designs",
      items: [
        {
          label: "Mouses Painted",
          href: `${DOMAIN}/produtos/?nmproduto=Mouses Painted`,
        },
      ],
    },
    {
      title: "Em estoque ( Todos )",
      items: [
        {
          label: "Mouses à pronta entrega",
          href: `${DOMAIN}/produtos/?nmproduto=Mouses à pronta entrega`,
        },
      ],
    },
  ],
  [
    {
      title: "Quer um mouse com seu design?",
      items: [
        {
          label: "Entre em contato via Whatsapp",
          href: `https://wa.me/5521994391557"`,
        },
      ],
    },
  ],
];

export const arcadeColumns = [
  [
    {
      title: "Arcade Bartop",
      items: [
        {
          label: "Bartops Customizados",
          href: `${DOMAIN}/produtos/?nmproduto=Bartops Customizados`,
        },
        {
          label: "À pronta entrega",
          href: `${DOMAIN}/produtos/?nmproduto=à pronta entrega`,
        },
      ],
    },
    {
      title: "Arcade Stick",
      items: [
        {
          label: "Arcade Sticks Customizados",
          href: `${DOMAIN}/produtos/?nmproduto=Arcade Sticks Customizados`,
        },
        {
          label: "À pronta entrega",
          href: `${DOMAIN}/produtos/?nmproduto=À pronta entrega`,
        },
      ],
    },
  ],
  [
    {
      title: "Quer um Arcade com seu Design?",
      items: [
        {
          label: "Entre em contato via Whatsapp",
          href: `https://wa.me/5521994391557`,
        },
      ],
    },
  ],
];

export const sobreColumns = [
  [
    {
      title: "Informações",
      items: [
        {
          label: "Sobre a empresa",
          href: `${DOMAIN}/sobre`,
        },
        {
          label: "O Time PG",
          href: `${DOMAIN}/time-pg`,
        },
        {
          label: "Avaliações",
          href: `${DOMAIN}/avaliacoes`,
        },
      ],
    },
    {
      title: "Suporte",
      items: [
        {
          label: "Entre em contato",
          href: "https://wa.me/5521994391557",
        },
        {
          label: "Rastrear Pedidos",
          href: "https://rastreamento.correios.com.br/app/index.php",
        },
        {
          label: "FAQ's",
          href: "https://google.com",
        },
        {
          label: "Testar Controles",
          href: "https://hardwaretester.com/gamepad",
        },
      ],
    },
  ],
  [
    {
      title: "Games com PG",
      items: [
        {
          label: "Call of Duty + Warzone 2",
          href: "#",
        },
        {
          label: "Fortnite",
          href: "#",
        },
        {
          label: "Rocket League",
          href: "#",
        },
        {
          label: "Apex Legends",
          href: "#",
        },
        {
          label: "Rainbow Six Siege",
          href: "#",
        },
        {
          label: "FIFA 2K",
          href: "#",
        },
        {
          label: "GTA Online",
          href: "#",
        },
        {
          label: "Mortal Kombat",
          href: "#",
        },
        {
          label: "Street Fighters",
          href: "#",
        },
      ],
    },
  ],
  [
    {
      title: "Outros",
      items: [
        {
          label: "Termos de Uso",
          href: "#",
        },
        {
          label: "Garantias",
          href: "#",
        },
        {
          label: "Devoluções",
          href: "#",
        },
        {
          label: "Políticas de Privacidade",
          href: "#",
        },
        {
          label: "Manuais e instruções",
          href: "#",
        },
      ],
    },
  ],
];
