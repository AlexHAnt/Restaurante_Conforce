import React, { useState, useEffect } from "react";
import axios from 'axios'
import moment from 'moment';
import { Table, Input, Button, Popconfirm, Checkbox, Col, Row, } from 'antd';
import { SearchOutlined, EditOutlined, DeleteOutlined, FilePdfOutlined, RedoOutlined, DesktopOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import 'antd/dist/antd.css';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import Template from '../components/Template'
import { Link } from 'react-router-dom'

const logo = process.env.REACT_APP_LOGO_BASE64 //Logo
let dados = []
let searchedColumn = '',
  searchText = '',
  now = String(moment().format('MMMM Do YYYY')) //Data atual


const Tables = props => {
  const baseURL = `${process.env.REACT_APP_BASE_URL}/${props.URL}`,
    api = axios.create({
      baseURL
    })

  const [columns, setColumns] = useState([]);
  const [PDForientation, setPDForientation] = useState('');
  const [data, setData] = useState([]);
  const [loadDatas, setLoadDatas] = useState(false);


  useEffect(() => {
    loadInitialTable()
  }, [])


  async function loadInitialTable() {
    var columnsArray = []
    loadData()
    for (var i = 0; i < props.columns.length; i++) {
      columnsArray.push({
        title: props.columns[i][0],
        dataIndex: props.columns[i][1],
        align: 'center',
        ...getColumnSearchProps(props.columns[i][1]),
      })
    }
    columnsArray.push({
      title: 'Action', key: 'action', width: 120, align: 'center',
      render: (t, register) =>
        <>
          {!!props.newPayment && <Link to={{ pathname: props.newPayment, state: { register } }} ><Button type="primary" size='small' style={{ margin: '0 2px' }} ><DesktopOutlined /></Button></Link>}
          {!!props.view && <Link to={{ pathname: props.view, state: { register } }} ><Button type="primary" size='small' style={{ margin: '0 2px' }} ><DesktopOutlined /></Button></Link>}
          <Link to={{ pathname: props.path, state: { register } }} ><Button type="primary" size='small' style={{ margin: '0 2px' }} ><EditOutlined /></Button></Link>
          <Popconfirm title="Deseja excluir este registro?" onConfirm={() => deleteData(register)}>
            <Button type="danger" size='small' style={{ margin: '0 2px' }} ><DeleteOutlined /></Button>
          </Popconfirm>
        </>
    })
    setColumns(columnsArray)
  }


  async function loadTable() {
    var columnsArray = []
    loadData()
    for (var i = 0; i < props.columns.length; i++) {
      columnsArray.push({
        title: props.columns[i][0],
        dataIndex: props.columns[i][1],
        align: 'center',
        ...getColumnSearchProps(props.columns[i][1]),
      })
    }
    columnsArray.push({
      title: 'Ação', key: 'action', width: 120, align: 'center',
      render: (t, register) =>
        <>
          <Link to={{ pathname: props.path, state: { register } }} ><Button type="primary" size='small' style={{ margin: '0 2px' }} ><EditOutlined /></Button></Link>
          <Popconfirm title="Deseja excluir este registro?" onConfirm={() => deleteData(register)}>
            <Button type="danger" size='small' style={{ margin: '0 2px' }} ><DeleteOutlined /></Button>
          </Popconfirm>
        </>
    })
    setColumns(columnsArray)
    setLoadDatas(true)
  }


  async function loadData() {
    const { data } = await api.get("/")
    setData(data)
  }

  async function deleteData(register) {
    await api.delete('/' + register.id)
    loadData()
  }

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) =>
      (
        <div style={{ padding: 8 }}>
          <Input
            ms={dados = []}
            placeholder={`Search `}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
      </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
        </Button>
        </div>
      ),
    filterIcon: filtered => (
      <SearchOutlined />
    ),
    onFilter: (value, record) =>
      !!record[dataIndex] && record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),

    render: (text) => (
      searchedColumn === dataIndex ? (
        dados.push([text]),
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={!!text && text.toString()}
        />
      ) : (
          dados.push([text]),
          text
        )
    )
    // render(text, record) {
    //   dados.push([text])

    //   let now = moment().format('YYYY-MM-DD') //Data atual
    //   let carencia = moment().subtract(5, 'day').format('YYYY-MM-DD') //Data atual subtraído 5 dias (dias de carência)
    //   let background = ''

    //   if (moment(record.EXPIRATION).isBetween(carencia, now)) {
    //     background = '#ff944d'
    //   }
    //   if (moment(record.EXPIRATION).add(5, 'day').isBefore(now)) {
    //     background = '#ff0000'
    //   }
    //   if (!!record.PAID_DATE) {
    //     background = '#80ff80'
    //   }
    //   return {
    //     props: {
    //       style: { background: background },
    //     },
    //     children: <div>{text}</div>,
    //   };
    // },
  })

  function handleSearch(selectedKeys, confirm, dataIndex) {
    confirm();
    searchText = selectedKeys[0]
    searchedColumn = dataIndex
  };

  function handleReset(clearFilters) {
    clearFilters();
    searchText = ''
  };


  function pdf() { //Função para gerar PDF da tabela
    const doc = new jsPDF({
      orientation: PDForientation,
    })
    const totalPagesExp = "{}"
    let content = []

    for (var i = 0; i < (dados.length); i = i + props.columns.length) {
      var y = []
      for (var j = 0; j < props.columns.length; j++) {
        !!dados[i] && y.push(dados[i + j][0])
      }
      content.push(y)
    }
    doc.setFont('arial');
    doc.setFontType('bold');
    doc.setFontSize(20);
    doc.text('RELATÓRIO DE ', doc.internal.pageSize.getWidth() / 2, 16, { align: "center" })//Título
    doc.text(props.title, doc.internal.pageSize.getWidth() / 2, 26, { align: "center" })//Título

    doc.setFontSize(10);
    doc.setFontType('normal');
    PDForientation === '' ? doc.text(now, 170, 16) : doc.text(now, 250, 16) //Horário
    // doc.addImage(logo, 'JPEG', 9, 2, 35, 35)//Logo

    doc.autoTable({
      head: props.head,
      body: content,
      startY: 30,
      styles: { halign: 'center', fontSize: 7.5 },

      didDrawPage: data => {
        PDForientation === '' ? doc.rect(5, 5, 200, 288) : doc.rect(5, 5, 288, 200)//Margem da folha
        let footerStr = "Page " + doc.internal.getNumberOfPages();
        if (typeof doc.putTotalPages === 'function') {
          footerStr = footerStr + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(footerStr, data.settings.margin.right, doc.internal.pageSize.height - 10);
      }
    });
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }
    doc.save(`${props.title}.pdf`);
    setLoadDatas(false)
  }

  function orientation(e) { //Função para selecionar modo do PDF (vertical ou paisagem)
    !!e.target.checked ? setPDForientation('landscape') : setPDForientation('')
  }

  return (
    <Template
      route={[{ path: 'Home', breadcrumbName: 'Home' }, { breadcrumbName: 'Consults' }, { breadcrumbName: props.title }]}
      content={
        <>
          <Row gutter={[16, 20]}>
            <Col span={3}>
              <Button type='primary' disabled={!!loadDatas ? false : true} onClick={() => pdf()}>Gerar PDF  <FilePdfOutlined /></Button>
            </Col>
            <Col span={16}>
              <Checkbox onChange={orientation}>Modo Paisagem </Checkbox>
            </Col>
            <Col span={3}>
              <Button type='primary' onClick={() => loadTable()}>Atualizar Dados <RedoOutlined /></Button>
            </Col>

          </Row>
          <Table
            pagination={{ pageSizeOptions: ['10', '20', '30', String(data.length)], showSizeChanger: true }}
            columns={columns}
            bordered
            rowKey='id'
            // size='small'
            tableLayout='unset'
            scroll={{ x: 1500 }}
            dataSource={data} />
        </>
      }>
    </Template>
  )
}
export default Tables




