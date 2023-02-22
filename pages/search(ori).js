import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Form, Row, Col, Button } from 'react-bootstrap';

function Search(){
 
  const router= useRouter();   
  const { register, handleSubmit, setValue } = useForm();

  const setSearchCriteria = () => {
    const { query } = router;
    if (query.q) setValue("q", query.q);
    if (query.searchBy) setValue("searchBy", query.searchBy);
    if (query.geoLocation) setValue("geoLocation", query.geoLocation);
    if (query.medium) setValue("medium", query.medium);
    if (query.isOnView) setValue("isOnView", true);
    if (query.isHighlight) setValue("isHighlight", true);
  }
  
  function submitForm(data){
    console.log(data)

    let queryString = `${data.searchBy}=true`;

    if(data.geoLocation){
      queryString += `&geoLocation=${data.geoLocation}`
    }
    if(data.medium){
      queryString += `&medium=${data.medium}`
    }
    queryString += `&isOnView=${data.isOnView}&isHighlight=${data.isHighlight}&q=${data.q}`
    router.push(`/artwork?${queryString}`)
  }

  return(
    <>
      <Form onSubmit={handleSubmit(submitForm)}> 
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Search Query</Form.Label>
              <Form.Control {...register("q")} type="text" placeholder="" name="q" required/>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select {...register("searchBy")} name="searchBy" className="mb-3">
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control {...register("geoLocation")} type="text" placeholder="" name="geoLocation" />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;, &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;, &quot;New York&quot;, etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control {...register("medium")} type="text" placeholder="" name="medium"/>
              <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;, &quot;Furniture&quot;, &quot;Paintings&quot;, &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
              {...register("isHighlight")}
            />
            <Form.Check
              type="checkbox"
              label="Currently on View"
              name="isOnView"
              {...register("isOnView")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  )
}

export default Search;
