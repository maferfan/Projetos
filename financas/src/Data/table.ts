export type TableType = {
    title: string,
    value: number,
    categories: "Despesa" | "Receita",
    data: string
}

export const table: TableType[] = [
    { title: "Pagamento", value: 20, categories: "Receita", data: "2023-07-12" },
]