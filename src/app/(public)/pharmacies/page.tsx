"use client";

import { useEffect } from "react";
import { PharmacieCard } from "@/components/PharmacieCard/PharmacieCard";
import { Container } from "@/shared/Container";
import { Pagination } from "@/components/Pagination/Pagination";
import { usePagination } from "@/hooks/usePagination";
import { Spinner } from "@/shared/Spinner";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPharmacies } from "@/redux/pharmacies/operations";
import {
  selectPharmacies,
  selectPharmaciesLoading,
  // selectPharmaciesError,
  selectPharmaciesPagination,
} from "@/redux/pharmacies/selectors";

const PharmaciesPage = () => {
  const dispatch = useAppDispatch();
  const pharmacies = useAppSelector(selectPharmacies);
  const loading = useAppSelector(selectPharmaciesLoading);
  // const error = useAppSelector(selectPharmaciesError);
  const paginationData = useAppSelector(selectPharmaciesPagination);

  const { currentPage, deviceLimit, handlePageChange } = usePagination({
    responsiveLimits: {
      mobile: 6,
      tablet: 8,
      desktop: 12,
    },
  });

  useEffect(() => {
    dispatch(fetchPharmacies({ page: currentPage, limit: deviceLimit }));
  }, [dispatch, currentPage, deviceLimit]);

  if (loading) {
    return <Spinner />;
    // <Container className="py-8 px-4">
    //   <div className="max-w-7xl mx-auto">
    //     <div className="text-center py-12">
    //       <p className="text-gray-dark text-lg">Loading pharmacies...</p>
    //     </div>
    //   </div>
    // </Container>
  }

  // if (error) {
  //   return (
  //     <Container className="py-8 px-4">
  //       <div className="max-w-7xl mx-auto">
  //         <div className="text-center py-12">
  //           <p className="text-red-500 text-lg">Error: {error}</p>
  //         </div>
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <Container className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-black-true mb-8 text-center">
          Pharmacies
        </h1>

        {pharmacies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-dark text-lg">No pharmacies found.</p>
          </div>
        ) : (
          <>
            <ul className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 mb-8">
              {pharmacies.map((pharmacie) => (
                <li key={pharmacie._id}>
                  <PharmacieCard pharmacie={pharmacie} />
                </li>
              ))}
            </ul>

            {paginationData && paginationData.totalPages > 1 && (
              <Pagination
                currentPage={paginationData.currentPage}
                totalPages={paginationData.totalPages}
                onPageChange={handlePageChange}
                className="mt-8"
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default PharmaciesPage;
