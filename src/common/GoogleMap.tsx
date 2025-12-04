export default function GoogleMap() {
  return (
    <div className="wiondefault-bg">
      <div className="responsive-map aos-init" data-aos-delay="500" data-aos="fade-up">
        <iframe
          className="wioncontact-map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9440.12!2d-87.3634956!3d41.4333013!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8811ef9502c0bd0b%3A0xff750847a6557080!2sCP%20nails!5e0!3m2!1svi!2sus!4v1730700000000"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}