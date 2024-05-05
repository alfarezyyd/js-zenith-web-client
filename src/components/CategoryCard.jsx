import {Card, CardBody, CardHeader, Divider, Image} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMobileScreen} from "@fortawesome/free-solid-svg-icons";


export default function CategoryCard() {
  return (
    <Card className="py-4">
      <CardHeader className="overflow-visible py-2">
        <FontAwesomeIcon icon={faMobileScreen} size="6x" className={"mx-auto"}/>
      </CardHeader>
      <CardBody className="pb-0 pt-2 px-4 flex-col items-start">
        <Divider/>
        <p className="text-tiny uppercase font-bold mt-2">Telepon Genggam</p>
      </CardBody>
    </Card>
  )
}