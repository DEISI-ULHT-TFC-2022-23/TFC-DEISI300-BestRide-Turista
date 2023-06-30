export class Tour {
  constructor(
    public id: number,
    public description: string,
    public price: string,
    public duration: string,
    public image: string,
    public title: string,
    public coordinates: [number, number][],
    public arquivado: string,
    public city_id: number,
    public enterprise: number,
    public driver: number
  ) {}
}
