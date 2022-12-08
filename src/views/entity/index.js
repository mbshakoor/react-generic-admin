import Listing from "components/Listing";
// import { entity } from "data/entity";
import React, { useEffect, useState } from "react";
import { removeEntity } from "store/slices/entitySlice";

// react-bootstrap components
import {
  Button,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getEntity } from "store/slices/entitySlice";
import Form from "./create/index";

function Entity(props) {
  const { getRoute, delRoute } = props
  const [isCreate, setCreate] = useState(false)
  const [editId, setEditId] = useState()
  // const [delId, setDelId] = useState()

  const dispatch = useDispatch()
  const entity = useSelector( state => state.entity.entities )

  useEffect(() => {
    dispatch(getEntity(getRoute))
  }, [])

  const handleDel = (id) => {
    const endPoint = delRoute.replace(":id", id)
    dispatch(removeEntity(endPoint))
    dispatch(getEntity(getRoute))
  }

  const columns = entity.columns && entity.columns.length > 0 ? entity.columns.map(col => {
      return {
        Header: col.name.replace("_", " "),
        accessor: col.name
      }
  }): []



  const data = entity.data ? entity.data : []

  return (
    <>
      {
        isCreate || editId ?
          <Form {...props} cols={entity.columns} editId={editId} removeEditId={(() => setEditId(undefined))}/> :
          <Container fluid>
            <Row>
              <Col md="12">
                <Card className="strpied-tabled-with-hover">
                  <Card.Header>
                    <Card.Title as="h4">Striped Table with Hover</Card.Title>
                    <div className="d-flex justify-content-between">
                      <p className="card-category mr-auto">
                        Here is a subtitle for this table
                      </p>
                      <Button
                        className="btn-fill pull-right"
                        variant="primary"
                        onClick={() => setCreate(true)}>
                        Create
                      </Button>
                     
                    </div>
                  </Card.Header>
                  <Card.Body className="table-full-width table-responsive px-0">
                    <Listing
                      columns={columns}
                      rowsData={data}
                      handleEdit={(id) => setEditId(id)}
                      handleDel={(id) => handleDel(id)}
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
      }

    </>
  );
}

export default Entity;
