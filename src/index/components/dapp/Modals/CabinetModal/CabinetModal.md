{modal &&
  <CabinetModal onClose={() => {setModal(false)}}>
    <TokenSelect onClose={() => {setModal(false)}} tokens={[]} loadAccountBalances = {() => {}} />
  </CabinetModal>
}
