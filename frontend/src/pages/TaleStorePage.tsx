import React, { useState, useEffect } from "react"
import axios from "utils/axios"
import TaleStoreList from "components/MyPageComponents/TaleStore/TaleStoreList"
import useApi from "hooks/useApi"

const TaleStorePage = function () {
  return (
    <div className="overflow-y-auto mx-2 my-3 p-5">
      <TaleStoreList />
    </div>
  )
}

export default TaleStorePage
