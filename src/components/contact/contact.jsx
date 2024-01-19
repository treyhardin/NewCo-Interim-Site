import { Show, createEffect, createResource, createSignal } from 'solid-js'
import styles from './contact.module.css'
import { navigationObserver, observer } from '../../utilities/intersectionObserver'
import { getContactContent } from '../../utilities/sanity-client'

export default function Contact() {

  const [ data ] = createResource(getContactContent)
  const [ currentForm, setCurrentForm ] = createSignal(null)

  let projectInquiryForm, newsletterForm
 
  // Add HubSpot Script
  const script = document.createElement('script')
  script.src='//js.hsforms.net/forms/embed/v2.js'
  document.body.appendChild(script)

  const loadInquiryForm = () => {

    script.addEventListener('load', () => {
      if (window.hbspt) {
        projectInquiryForm = window.hbspt.forms.create({
            region: "na1",
            portalId: "41750854",
            formId: "c98f5a1f-f1d9-4734-a314-8053298a3451",
            target: '#projectInquiryForm'
        })
      } else {
        console.log('Form Load Error')
      }

      // setCurrentForm(el.value)
    });
  }

  const loadNewsletterForm = () => {

    script.addEventListener('load', () => {
      if (window.hbspt) {
        newsletterForm =window.hbspt.forms.create({
          region: "na1",
          portalId: "41750854",
          formId: "adfd1a1f-ca8a-4ed2-aead-5fbe29388532",
          target: '#newsletterForm'
        })
      } else {
        console.log('Form Load Error')
      }
    });
  }

  const handleFormToggle = (e) => {

    if (e.target.checked) {
      setCurrentForm(e.target.value)
    }
  }



  return (
    <Show when={data()}>
    <section class={styles.contact} id="contact" data-animated="false" ref={el => {
      observer.observe(el)
      navigationObserver.observe(el)
    }}>
      <div class={styles.sectionTitle}>
        <h2>{data()[0].heading}</h2>
        <p>{data()[0].subheading}</p>

        <div class={styles.formToggle}>
          <fieldset class={styles.toggleFields}>
            
            <label for="inquiry" class={styles.radio} data-active={currentForm() == "projectInquiry" ? true : false}>
              <input 
                type="radio" 
                id="inquiry" 
                name="contact" 
                value="projectInquiry" 
                checked={true}
                onChange={handleFormToggle}
                ref={el => setCurrentForm(el.value)} 
              />
              Project Inquiry
            </label>

            <label for="newsletter" class={styles.radio} data-active={currentForm() == "newsletter" ? true : false}>
              <input 
                type="radio" 
                id="newsletter" 
                name="contact" 
                value="newsletter" 
                onChange={handleFormToggle}
              />
              Stay in Touch
            </label>

          </fieldset>
        </div>
      </div>

      <div class={styles.hubspotForm} id="projectInquiryForm" ref={el => loadInquiryForm(el)} data-hidden={currentForm() == "projectInquiry" ? false : true}></div>
      <div class={styles.hubspotForm} id="newsletterForm" ref={el => loadNewsletterForm(el)} data-hidden={currentForm() == "newsletter" ? false : true}></div>

    </section>
    </Show>
  )
}