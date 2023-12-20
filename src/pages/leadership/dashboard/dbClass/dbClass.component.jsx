import { useState } from "react";

import BarChartTopProduct from "./chartDbClass/chartDbClass.component";

import {
    Div,
    DivLeft,
    DivContent,
    H1,
    DivBody,
    Span,
    DivHead,
    Select,
    Option,
    DivSelect,
    SpanName,
    Input
} from "./dbClass.styles"
const TopProduct = () => {
    const [quantity, setQuantity] = useState(8)
    const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const calculateYears = () => {
        const currentYear = new Date().getFullYear();
        const startYear = 2000;
        const years = [];

        for (let year = startYear; year <= currentYear; year++) {
            years.push(year);
        }

        return years;
    }

    const yearsList = calculateYears();

    const data = [
        {diem:10, soluong: 150},
        {diem:9, soluong: 250},
        {diem:8, soluong: 10},
        {diem:7, soluong: 350},
        {diem:6, soluong: 110},
        {diem:5, soluong: 170},
        {diem:4, soluong: 103},
        {diem:3, soluong: 12},
        {diem:2, soluong: 13},
        {diem:1, soluong: 150},
    ];

    data.sort((a, b) => b.soluong - a.soluong);

    const [useData, setUseData] = useState({
        labels: data.map((item) => item.diem),
        datasets: [
            {
                label: "Tổng số điểm:",
                data: data.map(item => item.soluong),
                backgroundColor: [
                    "#83D9EC"
                ],
            },
        ]
    });

    return (
        <Div>
            <DivHead>      
                <DivSelect>
                    <SpanName>Day:</SpanName>
                    <Input type="number" min={1} max={31}/>
                </DivSelect> 
                <DivSelect>
                    <SpanName>Month:</SpanName>
                    <Select>
                        <Option></Option>
                        {months.map((item, index) => (
                            <Option key={index}>{item}</Option>
                        ))}
                    </Select>
                </DivSelect>
                <DivSelect>
                    <SpanName>Year:</SpanName>
                    <Select>
                        <Option></Option>
                        {yearsList.map((item, index) => (
                            <Option key={index}>{item}</Option>
                        ))}
                    </Select>
                </DivSelect>
                <DivSelect>
                    <SpanName>Quantity</SpanName>
                    <Input value={quantity} onChange={(e) => setQuantity(e.target.value)}/>
                </DivSelect>
            </DivHead>
            <DivBody>
                {/* <DivLeft>
                    <H1>Top Product</H1>
                    <Span>Total: 1000 san pham</Span>
                </DivLeft> */}
                <DivContent>
                    <BarChartTopProduct chartData={useData} />
                </DivContent>
            </DivBody>
        </Div>
    )
}

export default TopProduct;