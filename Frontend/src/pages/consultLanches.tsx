import React from "react";
import Table from '../components/Table'

export default function Consults() {
  return (
    <Table
      title='LANCHES'
      head={[['Lanche', 'Ingredientes']]}
      columns={
        [['Lanche', 'Lanche'], ['Ingredientes', 'Ingredientes']]
      }
      URL={'Lanches'}
      path={'/editLanche'}
    />
  )
}