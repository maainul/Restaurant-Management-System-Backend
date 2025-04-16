import CreateOfferRequestDto from "../dto/offer/CreateOfferRequest.dto";
import UpdateOfferRequestDto from "../dto/offer/UpdateOfferRequest.dto";
import { ValidationError } from "../errors/errors";

const validateOfferData = (data: CreateOfferRequestDto | UpdateOfferRequestDto): void => {
  const errors: { field: string; message: string }[] = [];

  if (!data.name || data.name.trim() === "") {
    errors.push({ field: "name", message: "name is required" });
  } else if (typeof data.name !== "string") {
    errors.push({field: "name",message: "Category Name must be at least 10 characters",});
  } else if (data.name.length < 2) {
    errors.push({field: "name",message: "Category Name must be at least 3 characters",});
  }

  if (!data.discount) {
    errors.push({ field: "discount", message: "discount is required" });
  } else if (typeof data.name !== "string") {
    errors.push({ field: "discount", message: "discount must be number" });
  }

  if (!data.startDate) {
    errors.push({ field: "startDate", message: "startDate is required" });
  }
  if (!data.endDate) {
    errors.push({ field: "endDate", message: "endDate is required" });
  }

  if (errors.length > 0) {
    throw new ValidationError(errors, 400);
  }
};

export default validateOfferData;
