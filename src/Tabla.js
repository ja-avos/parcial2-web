import React from "react";
import { Table } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Chart from "./Chart";
import useData from "./useData";

const Tabla = () => {
    const [data] = useData();

    return (
        <div className='row'>
            <Table striped bordered hover className='text-justify mx-auto' style={{minWidth: '1000px', width:'1200px'}}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th><FormattedMessage id='table.head.name' defaultMessage='Name' description='Name of the serie' /></th>
                        <th><FormattedMessage id='table.head.channel' defaultMessage='Channel' description='Channel of the serie' /></th>
                        <th><FormattedMessage id='table.head.description' defaultMessage='Description' description='Description of the serie' /></th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.length &&
                        data.map((serie) => {
                            return (
                                <tr key={serie.id}>
                                    <td>{serie.id}</td>
                                    <td>{serie.name}</td>
                                    <td>{serie.channel}</td>
                                    <td>{serie.description}</td>
                                </tr>
                            );
                        })}
                </tbody>

            </Table>
            <Chart />
        </div>
    );
};

export default Tabla;
