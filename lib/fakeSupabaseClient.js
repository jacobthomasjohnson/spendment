const STORAGE_KEY = "fakeSupabaseDB";

function loadFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function saveToStorage(newData) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
}

let data = loadFromStorage() ?? {
  licenses: [
    {
      tool: "Example Key License",
      key: "123-456-789",
      category: "Productivity",
    },
  ],
  subscriptions: [
    {
      tool: "Notion",
      amount: "$8/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "1",
      active: true,
    },
    {
      tool: "Figma",
      amount: "$15/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "3",
      active: true,
    },
    {
      tool: "Linear",
      amount: "$10/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "3",
      active: true,
    },
    {
      tool: "Raycast Pro",
      amount: "$8/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "4",
      active: true,
    },
    {
      tool: "Creative Cloud",
      amount: "$52/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "8",
      active: true,
    },
    {
      tool: "Slack Pro",
      amount: "$7/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "9",
      active: true,
    },
    {
      tool: "1Password",
      amount: "$3/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "13",
      active: true,
    },
    {
      tool: "ChatGPT Plus",
      amount: "$20/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "17",
      active: true,
    },
    {
      tool: "Sentry",
      amount: "$29/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "20",
      active: true,
    },
    {
      tool: "Netflix",
      amount: "$15/mo",
      category: "Entertainment",
      recurring: "Monthly",
      date: "21",
      active: true,
    },
    {
      tool: "Spotify Premium",
      amount: "$12/mo",
      category: "Entertainment",
      recurring: "Monthly",
      date: "22",
      active: true,
    },
    {
      tool: "Youtube Premium",
      amount: "$14/mo",
      category: "Entertainment",
      recurring: "Monthly",
      date: "22",
      active: true,
    },
    {
      tool: "Sketch",
      amount: "$9/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "—",
      active: false,
    },
    {
      tool: "Disney+",
      amount: "$13/mo",
      category: "Entertainment",
      recurring: "Monthly",
      date: "—",
      active: false,
    },
    {
      tool: "Bear Notes",
      amount: "$1.49/mo",
      category: "Productivity",
      recurring: "Monthly",
      date: "—",
      active: false,
    },
  ],
};

saveToStorage(data); // initial save if it's new

export const fakeSupabase = {
  from: (table) => ({
    select: async () => {
      return { data: data[table], error: null };
    },
    insert: async (records) => {
      if (!Array.isArray(data[table])) {
        data[table] = [];
      }
      data[table] = [...data[table], ...records];
      saveToStorage(data);
      return { data: records, error: null };
    },

    update: (values) => {
      return {
        match: async (filters) => {
          let updatedRows = [];
          data[table] = data[table].map((row) => {
            if (Object.entries(filters).every(([k, v]) => row[k] === v)) {
              const updated = { ...row, ...values };
              updatedRows.push(updated);
              return updated;
            }
            return row;
          });
          saveToStorage(data);
          return { data: updatedRows, error: null };
        },
      };
    },

    delete: () => {
      return {
        match: async (filters) => {
          data[table] = data[table].filter(
            (row) => !Object.entries(filters).every(([k, v]) => row[k] === v)
          );
          saveToStorage(data);
          return { data: null, error: null };
        },
      };
    },
  }),
};

export function resetData() {
  if (typeof window === "undefined") return;

  const defaultData = {
    licenses: [
      {
        tool: "Example Key License",
        key: "123-456-789",
        category: "Productivity",
      },
    ],
    subscriptions: [
      {
        tool: "Notion",
        amount: "$8/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "1",
        active: true,
      },
      {
        tool: "Figma",
        amount: "$15/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "3",
        active: true,
      },
      {
        tool: "Linear",
        amount: "$10/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "3",
        active: true,
      },
      {
        tool: "Raycast Pro",
        amount: "$8/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "4",
        active: true,
      },
      {
        tool: "Creative Cloud",
        amount: "$52/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "8",
        active: true,
      },
      {
        tool: "Slack Pro",
        amount: "$7/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "9",
        active: true,
      },
      {
        tool: "1Password",
        amount: "$3/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "13",
        active: true,
      },
      {
        tool: "ChatGPT Plus",
        amount: "$20/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "17",
        active: true,
      },
      {
        tool: "Sentry",
        amount: "$29/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "20",
        active: true,
      },
      {
        tool: "Netflix",
        amount: "$15/mo",
        category: "Entertainment",
        recurring: "Monthly",
        date: "21",
        active: true,
      },
      {
        tool: "Spotify Premium",
        amount: "$12/mo",
        category: "Entertainment",
        recurring: "Monthly",
        date: "22",
        active: true,
      },
      {
        tool: "Youtube Premium",
        amount: "$14/mo",
        category: "Entertainment",
        recurring: "Monthly",
        date: "22",
        active: true,
      },
      {
        tool: "Sketch",
        amount: "$9/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "—",
        active: false,
      },
      {
        tool: "Disney+",
        amount: "$13/mo",
        category: "Entertainment",
        recurring: "Monthly",
        date: "—",
        active: false,
      },
      {
        tool: "Bear Notes",
        amount: "$1.49/mo",
        category: "Productivity",
        recurring: "Monthly",
        date: "—",
        active: false,
      },
    ],
  };

  localStorage.setItem("fakeSupabaseDB", JSON.stringify(defaultData));
  window.location.reload(); // optional: force reload to reflect reset
}
