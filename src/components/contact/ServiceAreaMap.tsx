
const ServiceAreaMap = () => {
  return (
    <section className="py-20 bg-brand-gray">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-navy mb-8 text-center">Our Service Area</h2>
          <div className="rounded-xl overflow-hidden shadow-xl bg-white">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200061.45059881864!2d-87.71461289019358!3d37.97171237558682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x886a09aa5f3a1061%3A0xcfe1aba6c6b2a70a!2sEvansville%2C%20IN!5e0!3m2!1sen!2sus!4v1682974001599!5m2!1sen!2sus"
              width="100%" 
              height="500" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Service Area Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaMap;
