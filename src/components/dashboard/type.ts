export type Member = {
  id: number;
  name: string;
  mobile_no: string;
  address: string;
  qr_id: number;
  status: string;
  ins_date_time: Date;
};

export type Supervisor = {
    sup_id: number;
    sup_contact: string;
    sup_password: string;
  }
  

  export type Qrcodes ={
    id : number;
    qr_code_no: number ;
    ins_date_time: Date;
    status: string;
    allocated_date: Date;
  }