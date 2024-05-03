
export class Complex {

   re: 0;
   im: 0;

   constructor(re, im) {
      this.re = re;
      this.im = im;
   }

   toString = () => {
      return `${this.re}+${this.im}i`;
   }

   compare = (z) => {
      const this_str = this.toString();
      const z_str = z.toString();
      return this_str === z_str;
   }

   magnitude = () => {
      if (isNaN(this.re) || isNaN(this.im)) {
         return -1;
      }
      return Math.sqrt(this.re * this.re + this.im * this.im)
   }

   mul = (z) => {
      const a = this.re;
      const b = this.im;
      const c = z.re;
      const d = z.im;
      return new Complex(a * c - b * d, a * d + b * c)
   }

   divide = (den) => {
      const com_conj = new Complex(den.im, den.re);
      return this.mul(com_conj);
   }

   reciprocal = () => {
      const one = new Complex(1.0, 0)
      return one.divide(this);
   }

   scale = (s) => {
      return new Complex(s * this.re, s * this.im);
   }

   offset = (re, im) => {
      return new Complex(this.re + re, this.im + im);
   }

   add = (z) => {
      return new Complex(this.re + z.re, this.im + z.im);
   }

   sqrt = () => {
      const mag = this.magnitude()
      const first_part = Math.sqrt((mag + this.re) / 2)
      const sign = this.im / Math.abs(this.im)
      const second_part = sign * Math.sqrt((mag - this.re) / 2)
      return new Complex(first_part, second_part)
   }

   ln = () => {
      const mag = this.magnitude()
      const angle = Math.atan2(this.im, this.re)
      return new Complex(mag, angle)
   }

}

export default Complex;
