import { FilterQuery, SortOrder } from "mongoose";
import NotFoundError from "../errors/NotFoundError";

interface PaginateOptions<T> {
  repository: {
    countDocuments: (query: FilterQuery<T>) => Promise<number>;
    findAll: (
      query: FilterQuery<T>,
      options: { sort: any; skip: number; limit: number }
    ) => Promise<T[]>;
  };
  query: {
    search?: string;
    sort?: "latest" | "oldest";
    page?: string;
    limit?: string;
    status?: string;
  };
  searchableFields: (keyof T)[];
  toResponseDto: (doc: T) => any;
}

export async function paginateAndSearch<T>({
  repository,
  query,
  searchableFields,
  toResponseDto,
}: PaginateOptions<T>) {
  const { search = "",sort = "latest",page = "1",limit = "10",status} = query;

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const queryObject: any = {};
  if (status !== undefined) {
    queryObject.status = status;
  }

  if (search && searchableFields.length > 0) {
    queryObject.$or = searchableFields.map((field) => ({
      [field]: { $regex: search, $options: "i" },
    }));
  }

  const sortOption = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

  const totalDataCount = await repository.countDocuments(queryObject);
  const items = await repository.findAll(queryObject, {
    sort: sortOption,
    skip,
    limit: limitNumber,
  });

  if (items.length === 0) {
    throw new NotFoundError("No items found");
  }

  const pageDataCount = items.length;
  const numberOfPages = Math.ceil(totalDataCount / limitNumber);
  const upToPageTotalData = skip + pageDataCount;

  return {
    startPageData: skip + 1,
    pageDataCount,
    numberOfPages,
    totalDataCount,
    upToPageTotalData,
    data: items.map(toResponseDto),
  };
}
