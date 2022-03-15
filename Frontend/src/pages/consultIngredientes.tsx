import React from "react";
import Table from '../components/Table'

export default function Consults() {
  return (
    <Table
      title='INGREDIENTES'
      head={[['Ingrediente', 'Preço (R$)']]}
      columns={
        [['Ingrediente', 'Ingrediente'], ['Preço', 'Preco']]
      }
      URL={'Ingredientes'}
      path={'/editIngrediente'}
    />
  )
}