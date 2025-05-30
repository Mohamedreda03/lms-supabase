"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import { ActionTypes } from "@/utils/actionsTypes";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import Pagenation from "@/components/Pagenation";

const filterUsers = [
  ActionTypes.CENTER_CODE,
  ActionTypes.ONLINE_PAYMENT,
  ActionTypes.SUBSCRIPTION,
  ActionTypes.CENTER_PAYMENT,
];

export default function HistoryPage() {
  const pageSize = 15;

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [searchName, setSearchName] = useState<string>("");
  const [searchPhone, setSearchPhone] = useState<string>("");
  const [searchBtn, setSearchBtn] = useState<string>("1");
  const [filter, setFilter] = useState<ActionTypes | undefined>(undefined);

  const { data, isLoading: dataLoading } = useQuery({
    queryKey: ["userHistory", currentPage, searchBtn, filter],
    queryFn: async () => {
      const res = await axios.get(
        `/api/history?phone=${searchPhone}&page=${currentPage}&pageSize=${pageSize}&filter=${filter}&name=${searchName}`
      );

      setCurrentPage(res.data.meta.currentPage);
      setSearchTotalPages(res.data.meta.totalPages);

      return res.data;
    },
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchBtn(Math.random().toString());
  };

  return (
    <div className="px-5 py-10 md:px-10">
      <div>
        <form
          onSubmit={handleSearch}
          className="mb-4 flex items-center flex-col sm:flex-row gap-3"
        >
          <Input
            placeholder="بحث بأسم المستخدم"
            className="max-w-[300px]"
            onChange={(e) => setSearchName(e.target.value)}
            disabled={dataLoading}
          />

          <Input
            placeholder="بحث برقم الهاتف"
            className="max-w-[300px]"
            onChange={(e) => setSearchPhone(e.target.value)}
            disabled={dataLoading}
          />

          <div>
            <Button disabled={dataLoading} className="mt-auto">
              <span>بحث</span>
              <Search size={15} className="mr-1.5" />
            </Button>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center my-8">
        <div className="flex flex-wrap items-center justify-center gap-3 border p-2 rounded-lg border-secondary/50">
          <Button
            variant={filter === undefined ? "secondary" : "outline"}
            onClick={() => setFilter(undefined)}
          >
            الكل
          </Button>
          {filterUsers.map((type) => (
            <Button
              key={type}
              variant={filter === type ? "secondary" : "outline"}
              onClick={() => setFilter(type)}
            >
              {type === ActionTypes.CENTER_PAYMENT && "الدفع من خلال السنتر"}
              {type === ActionTypes.ONLINE_PAYMENT && "دفع اونلاين"}
              {type === ActionTypes.SUBSCRIPTION && "اشتراك الكورسات"}
              {type === ActionTypes.CENTER_CODE && "كود سنتر"}
            </Button>
          ))}
        </div>
      </div>
      {dataLoading ? (
        <Loading className="h-[300px]" />
      ) : (
        <Table dir="rtl" className="mb-8 border">
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">أسم الطالب</TableHead>
              <TableHead className="text-center">رقم الطالب</TableHead>
              <TableHead className="text-center">تاريخ العمليه</TableHead>
              <TableHead className="text-center">الحالة</TableHead>
              <TableHead className="text-center">القيمة</TableHead>
            </TableRow>
          </TableHeader>
          {data?.data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-lg">
                لا يوجد بيانات
              </TableCell>
            </TableRow>
          )}
          <TableBody>
            {data &&
              data?.data.map((history: any) => (
                <TableRow key={history?.id}>
                  <TableCell className="font-medium text-center">
                    {history?.user?.full_name}
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {history?.user?.student_phone}
                  </TableCell>
                  <TableCell className="text-center">
                    {format(
                      history?.createdAt,
                      "( hh:mm a ) ,eeee, d/ MM/ yyyy",
                      {
                        locale: ar,
                      }
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {history?.action === ActionTypes.CENTER_PAYMENT &&
                      "الدفع من خلال السنتر"}
                    {history?.action === ActionTypes.ONLINE_PAYMENT &&
                      "دفع اونلاين"}
                    {history?.action === ActionTypes.SUBSCRIPTION &&
                      "اشتراك كورس"}
                    {history?.action === ActionTypes.CENTER_CODE &&
                      "الدفع بكود سنتر"}
                  </TableCell>
                  <TableCell className="text-center">
                    {history?.price} جنيه
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}

      {searchTotalPages > 1 && (
        <Pagenation
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          searchTotalPages={searchTotalPages}
        />
      )}
    </div>
  );
}
