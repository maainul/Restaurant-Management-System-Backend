import CreateVariantRequestDto from "../../dto/variation/CreateVariantRequest.dto";
import UpdateVariantRequestDto from "../../dto/variation/UpdateVariantRequest.dto";
import VariantResponseDto from "../../dto/variation/VariantResponse.dto";



interface IVariantService {
    createVariant(createVariantDto: CreateVariantRequestDto): Promise<VariantResponseDto>;
    getVariants(): Promise<VariantResponseDto[]>;
    getVariantById(categoryId: string): Promise<VariantResponseDto | null>;
    updateVariant(categoryId: string, updateVariantDto: UpdateVariantRequestDto): Promise<VariantResponseDto>;
    deleteVariant(categoryId: string): Promise<boolean>;
    findByName(name: string): Promise<VariantResponseDto | null>;
}

export default IVariantService