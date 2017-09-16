import {
  MainIncomeResponse,
  CashFlowResponse,
  AdvanceMoneyResponse,
  ProfitResponse,
  PersonReceptionResponse,
  AllReceptionResponse,
  PersonProcessResponse,
  AllProcessResponse,
  AllWorkloadResponse,
  PersonWorkloadResponse,
  ClinicResponse

} from "../statistics-request-response";
export const getStatisticsMainIncome = {
  "TotalInflow": 1.0,
  "TotalOutflow": 2.0,
  "TotalSum": 3.0,
  "Items": [
    {
      "Date": "2017-05-01T14:45:32.458878+08:00",
      "Inflow": 4.0,
      "Outflow": 5.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-02T14:45:32.458878+08:00",
      "Inflow": 2.0,
      "Outflow": 3.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-03T14:45:32.458878+08:00",
      "Inflow": 7.0,
      "Outflow": 3.0,
      "Sum": 11.0
    },
    {
      "Date": "2017-05-04T14:45:32.458878+08:00",
      "Inflow": 9.0,
      "Outflow": 1.0,
      "Sum": 14.0
    },
    {
      "Date": "2017-05-05T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 23.0,
      "Sum": 24.0
    },
    {
      "Date": "2017-05-06T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 13.0,
      "Sum": 14.0
    },
    {
      "Date": "2017-05-07T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 23.0,
      "Sum": 24.0
    },
    {
      "Date": "2017-05-08T14:45:32.458878+08:00",
      "Inflow": 2.0,
      "Outflow": 3.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-09T14:45:32.458878+08:00",
      "Inflow": 2.0,
      "Outflow": 3.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-10T14:45:32.458878+08:00",
      "Inflow": 2.0,
      "Outflow": 3.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-11T14:45:32.458878+08:00",
      "Inflow": 2.0,
      "Outflow": 3.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-12T14:45:32.458878+08:00",
      "Inflow": 20.0,
      "Outflow": 3.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-13T14:45:32.458878+08:00",
      "Inflow": 2.0,
      "Outflow": 13.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-14T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 31.0,
      "Sum": 4.0
    },
    {
      "Date": "2017-05-15T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 13.0,
      "Sum": 34.0
    },
    {
      "Date": "2017-05-16T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 23.0,
      "Sum": 42.0
    },
    {
      "Date": "2017-05-17T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 13.0,
      "Sum": 44.0
    },
    {
      "Date": "2017-05-18T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 13.0,
      "Sum": 14.0
    },
    {
      "Date": "2017-05-19T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 23.0,
      "Sum": 34.0
    },
    {
      "Date": "2017-05-20T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 13.0,
      "Sum": 14.0
    },
    {
      "Date": "2017-05-21T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 23.0,
      "Sum": 34.0
    },
    {
      "Date": "2017-05-22T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 13.0,
      "Sum": 24.0
    },
    {
      "Date": "2017-05-23T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 13.0,
      "Sum": 34.0
    },
    {
      "Date": "2017-05-24T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 31.0,
      "Sum": 14.0
    },
    {
      "Date": "2017-05-25T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 32.0,
      "Sum": 24.0
    },
    {
      "Date": "2017-05-26T14:45:32.458878+08:00",
      "Inflow": 32.0,
      "Outflow": 13.0,
      "Sum": 34.0
    },
    {
      "Date": "2017-05-27T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 32.0,
      "Sum": 43.0
    }, {
      "Date": "2017-05-28T14:45:32.458878+08:00",
      "Inflow": 23.0,
      "Outflow": 23.0,
      "Sum": 24.0
    },
    {
      "Date": "2017-05-29T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 13.0,
      "Sum": 42.0
    },
    {
      "Date": "2017-05-30T14:45:32.458878+08:00",
      "Inflow": 12.0,
      "Outflow": 23.0,
      "Sum": 14.0
    },
    {
      "Date": "2017-05-31T14:45:32.458878+08:00",
      "Inflow": 22.0,
      "Outflow": 63.0,
      "Sum": 41.0
    }
  ]
};

export const getStatisticsCashFlow = [

];

export const getStatisticsAdvanceMoney = [

];

export const getStatisticsProfit = [

];
export const getStatisticsPersonReception = {

}
export const getStatisticsAllReception = [

];

export const getStatisticsPersonProcess = [

];
export const getStatisticsAllProcess = {

}
export const getStatisticsAllWorkload = [

];

export const getStatisticsPersonWorkload = [

];
export const getStatisticsClinic = {

}
