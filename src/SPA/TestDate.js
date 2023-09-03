import React from 'react';
import {isAfter} from "date-fns";

const TestDate = () => {

    const position = [51.505, -0.09];
    const position2 = [51.515, -0.09];
    const position3 = [51.525, -0.09];
    const position4 = [51.575, -0.09];
    const position5 = [51.535, -0.19];

    let item1 = {position: position, isTrue: true, startDate: '2023-05-17', endDate: '2023-05-18'};
    let item2 = {position: position2, isTrue: false, startDate: "2023-05-22", endDate: '2023-05-28'};
    let item3 = {position: position3, isTrue: true, startDate: "2023-05-25", endDate: '2023-05-30'};
    let item4 = {position: position4, isTrue: true, startDate: "2023-05-30", endDate: '2023-06-20'};
    let item5 = {position: position5, isTrue: true, startDate: "2023-05-27", endDate: '2023-06-15'};

    const data2 = [];
    data2.push(item1);
    data2.push(item2);
    data2.push(item3);
    data2.push(item4);
    data2.push(item5);

    const startDate = '2023-05-21';
    const endDate = '2023-05-31';

    console.log(item1 && isAfter(item1.startDate, startDate) && item1.endDate && !isAfter(item1.EndDate, endDate));
    console.log("Not is after " + item1.endDate && !isAfter(item1.EndDate, endDate));

    function isAfter(date1,date2){
        return date1>date2;
    }


     if (isAfter(item3.startDate,startDate) &&  !isAfter(item3.endDate,endDate) )
    // if (6 > 5) {
      //if(isAfter(item5.endDate,endDate))
   // if (!isAfter(endDate, startDate))
        return (
            <div>
                <h1>item.endDate = {startDate} isAfter </h1>
                <h1>EndDate = {endDate}</h1>
                <h1>Prawda</h1>
            </div>
        );
     else
        return (
            <div>
                <h1>item.endDate = {item4.endDate} isAfter </h1>
                <h1>EndDate = {endDate}</h1>
                <h1>Fałsz</h1>
            </div>
        );


};
export default TestDate;