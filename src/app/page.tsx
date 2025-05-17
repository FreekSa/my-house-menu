import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger></AccordionTrigger>
          <AccordionContent>

          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

