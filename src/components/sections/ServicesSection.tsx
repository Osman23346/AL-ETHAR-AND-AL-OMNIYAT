import { useEffect, useState } from "react";

import {
  Building2,
  Calculator,
  Scale,
  Megaphone,
  ClipboardList,
  BriefcaseBusiness
} from "lucide-react";

import { supabase } from "../../lib/supabaseClient";
import { siteContent } from "../../data/content";
import { Button, Card, Container, SectionHeader } from "../ui";
import type { Service } from "../../data/siteData";

type ServicesSectionProps = {
  onSelectService: (service: Service) => void;
};

type DatabaseService = {
  id: number;
  title: string;
  description: string;
  image: string;
  active: boolean;
  sort_order: number;
};

const serviceIcons = [
  Building2,
  Calculator,
  Scale,
  Megaphone,
  ClipboardList,
  BriefcaseBusiness
];

const fallbackImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80";

function ServicesSection({
  onSelectService
}: ServicesSectionProps) {
  const { businessServices } = siteContent;

  const [services, setServices] = useState(
    businessServices.items
  );

  useEffect(() => {
    let mounted = true;

    const loadServices = async () => {
      const { data, error } = await supabase
        .from("services")
        .select(
          "id,title,description,image,active,sort_order"
        )
        .eq("active", true)
        .order("sort_order", {
          ascending: true
        });

      if (error) {
        console.error(
          "Supabase services error:",
          error
        );

        return;
      }

      if (
        mounted &&
        data &&
        data.length > 0
      ) {
        setServices(data as DatabaseService[]);
      }
    };

    loadServices();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section id="services" className="services-section">
      <Container>
        <SectionHeader
          eyebrow={businessServices.eyebrow}
          title={businessServices.title}
          highlight={businessServices.highlight}
          description={businessServices.description}
        />

        <div className="services-grid">
          {services.map((service, index) => {
            const Icon =
              serviceIcons[index] ||
              BriefcaseBusiness;

            const selectableService: Service = {
              id: service.id,
              title: service.title,
              description: service.description,
              image:
                "image" in service && service.image
                  ? service.image
                  : fallbackImage
            };

            return (
              <Card
                key={service.id}
                className="service-card" data-reveal
                interactive
              >
                <div className="service-card-top">
                  <div
                    className="service-icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={29}
                      strokeWidth={1.8}
                    />
                  </div>

                  <span className="service-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="service-card-content">
                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <Button
                    type="button"
                    variant="ghost"
                    className="service-request-button"
                    onClick={() =>
                      onSelectService(
                        selectableService
                      )
                    }
                  >
                    <span>اطلب الخدمة</span>

                    <span
                      className="service-arrow"
                      aria-hidden="true"
                    >
                      ←
                    </span>
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

      </Container>
    </section>
  );
}

export default ServicesSection;