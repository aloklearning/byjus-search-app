// This page is used for model class to get the data serialized
import { deserialize, Deserialize } from 'cerialize';

/* UTILITY METHOD*/
export function cast(data, modelClass){
    return Deserialize(data, modelClass)
}

/* MODEL CLASS */
export class Job{

   @deserialize title: string
   @deserialize applylink: string
   @deserialize jd: string
   @deserialize companyname: string
   @deserialize location: string
   @deserialize experience: string
   @deserialize salary: string
   @deserialize type: string
   @deserialize skills: string
   @deserialize created: string
   @deserialize enddate: string
   @deserialize source: string
}