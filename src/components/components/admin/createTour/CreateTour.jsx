import { useState } from "react"
import { Form, Button, Divider, Row, Col, Typography, message } from "antd"

import { iNITIAL_TOUR_DATA } from "./tourSchema"
import BasicInfoSection from "./sections/BasicInfoSection"
import HotelSection from "./sections/HotelSection"
import DurationSection from "./sections/DurationSection"
import BookingSection from "./sections/BookingSection"
import FlightSection from "./sections/FlightSection"
import IncludedSection from "./sections/IncludedSection"
import DocumentsSection from "./sections/DocumentsSection"
import PriceSection from "./sections/PriceSection"
import AudienceSection from "./sections/AudienceSection"
import ExtrasSection from "./sections/ExtrasSection"
import DaySection from "./sections/DaysSection"
import GeoSection from "./sections/GeoSection"
import ImageSection from "./sections/Imagesection"
import api from "../../../../api/api"
const { Title } = Typography

const CreateTour = () => {
  const [form] = Form.useForm()
  const [formData, setFormData] = useState(iNITIAL_TOUR_DATA)

  const set = (path, value) => {
    const keys = path.split(".")
    if (keys.length === 1) {
      setFormData((prev) => ({ ...prev, [keys[0]]: value }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }))
    }
  }
  
  const setDay = (path, value) => {
    setFormData((prev) => {
      const keys = path.split(".");
      const newDeepCopy = { ...prev };
      let current = newDeepCopy;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        current[key] = Array.isArray(current[key])
          ? [...current[key]]
          : { ...current[key] };
        current = current[key];
      }

      current[keys[keys.length - 1]] = value;
      return newDeepCopy;
    });
  };
  
  const onFinish = async () => {
    try {
      if (formData.days.length < formData.duration.days) {
        message.warning(`Необходимо добавить ${formData.duration.days} дней. Сейчас добавлено: ${formData.days.length}`)
        return
      }
      
      const key = localStorage.getItem('secretKey')
      const res = await api.post(`/createTour?secretKey=${key}`, formData)
      console.log("Tour created:", res.data)
      message.success("Тур успешно создан!")
      form.resetFields()
      setFormData(iNITIAL_TOUR_DATA)
    } catch (err) {
      console.error(err)
      message.error(err.response?.data?.error || "Ошибка создания тура")
    }
  }

  const onFinishFailed = ({ errorFields }) => {
    console.log("Validation errors:", errorFields)
  }

  const props = { formData, set }
  const dayProps = { formData, setDay }
  
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 16px" }}>
      <Title level={3} style={{ marginBottom: 32 }}>
        Create Tour
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        scrollToFirstError
      >
        <BasicInfoSection  {...props} />
        <HotelSection      {...props} />
        <DurationSection   {...props} />
        <BookingSection    {...props} />
        <FlightSection     {...props} />
        <IncludedSection   {...props} />
        <DocumentsSection  {...props} />
        <PriceSection      {...props} />
        <AudienceSection   {...props} />
        <ExtrasSection     {...props} />
        <DaySection        {...dayProps} />
        <GeoSection formData={formData} set={set} />
        <ImageSection formData={formData} set={set} />
        <Divider />

        <Form.Item>
          <Row justify="end" gutter={12}>
            <Col>
              <Button onClick={() => form.resetFields()}>Reset</Button>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                Create Tour
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateTour